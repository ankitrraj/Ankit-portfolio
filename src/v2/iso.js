/* Isometric drawing primitives shared by every architecture scene.

   True iso: x runs right-and-down, y runs left-and-down, z runs up.
   Every solid is emitted as three shaded faces; the silhouette comes
   from stroking the polygons rather than drawing separate edges. */

const C = 0.8660254;
const r1 = (n) => Math.round(n * 10) / 10;
const pts = (a) => a.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ');

export function makeIso(S, OX = 0, OY = 0) {
  const P = (x, y, z = 0) => [OX + (x - y) * C * S, OY + (x + y) * 0.5 * S - z * S];
  const poly = (a, cls) => `<polygon class="${cls}" points="${pts(a)}"/>`;

  const box = (x, y, z, w, d, h, cls = '') => {
    const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
    const right = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
    const left = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
    return poly(left, `fl ${cls}`) + poly(right, `fr ${cls}`) + poly(top, `ft ${cls}`);
  };

  const cyl = (cx, cy, z, r, h, cls = '') => {
    const [bx, by] = P(cx, cy, z);
    const [tx, ty] = P(cx, cy, z + h);
    const rx = r1(1.2247 * r * S);
    const ry = r1(0.7071 * r * S);
    return (
      `<path class="fr ${cls}" d="M${r1(bx - rx)},${r1(by)} A${rx},${ry} 0 0 0 ${r1(bx + rx)},${r1(by)} ` +
      `L${r1(tx + rx)},${r1(ty)} A${rx},${ry} 0 0 1 ${r1(tx - rx)},${r1(ty)} Z"/>` +
      `<ellipse class="ft ${cls}" cx="${r1(tx)}" cy="${r1(ty)}" rx="${rx}" ry="${ry}"/>`
    );
  };

  return {
    P,
    S,
    box,
    cyl,
    // flat quads on each plane — screens, insets, indicator lamps
    qx: (x, y0, y1, z0, z1, cls) => poly([P(x, y0, z0), P(x, y1, z0), P(x, y1, z1), P(x, y0, z1)], cls),
    qy: (y, x0, x1, z0, z1, cls) => poly([P(x0, y, z0), P(x1, y, z0), P(x1, y, z1), P(x0, y, z1)], cls),
    qz: (z, x0, y0, x1, y1, cls) => poly([P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)], cls),
    line: (a, b) => {
      const p = P(...a);
      const q = P(...b);
      return `<line x1="${r1(p[0])}" y1="${r1(p[1])}" x2="${r1(q[0])}" y2="${r1(q[1])}"/>`;
    },
    slab: (x, y, z, w, d, cls = '') => box(x, y, z, w, d, 0.18, cls),
  };
}

export { r1, pts };
