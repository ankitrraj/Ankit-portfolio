import React from 'react';
import Hero from '../components/Hero';
import PodcastsSection from '../components/PodcastsSection';
import QuestionWidget from '../components/QuestionWidget';
import RelatedEvents from '../components/RelatedEvents';
import Marquee from '../components/Marquee';
import PageTransition from '../components/PageTransition';

const HomePage = () => (
  <PageTransition>
    <Hero />
    <Marquee color="#981082" textColor="#fff" speed={28} />
    <PodcastsSection />
    <Marquee color="#E7DB4C" textColor="#000" speed={34} reverse words={['Écoute', 'Découvre', 'Imagine', 'Rêve', 'Apprends', 'Joue']} />
    <QuestionWidget />
    <RelatedEvents />
  </PageTransition>
);

export default HomePage;
