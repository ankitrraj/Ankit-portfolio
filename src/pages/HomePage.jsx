import React from 'react';
import Hero from '../components/Hero';
import PodcastsSection from '../components/PodcastsSection';
import SkillsSection from '../components/SkillsSection';
import QuestionWidget from '../components/QuestionWidget';
import RelatedEvents from '../components/RelatedEvents';
import Marquee from '../components/Marquee';
import PageTransition from '../components/PageTransition';

const HomePage = () => (
  <PageTransition>
    <Hero />
    <Marquee color="#981082" textColor="#fff" speed={28} />
    <PodcastsSection />
    <Marquee color="#E7DB4C" textColor="#000" speed={34} reverse words={['Ship fast', 'Own the stack', 'AI products', 'Web & mobile', 'End to end']} />
    <SkillsSection />
    <RelatedEvents />
    <QuestionWidget />
  </PageTransition>
);

export default HomePage;
