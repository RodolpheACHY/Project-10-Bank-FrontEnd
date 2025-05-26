import React from 'react';
import Hero from '../../components/Hero';
import Features from '../../components/Features';

function HomePage() {
  return (
    <>
      <Hero 
        subtitles={['No fees.', 'No minimum deposit.', 'High interest rates.']} 
        mainText="Open a savings account with Argent Bank today!" 
      />
      <Features />
    </>
  );
}

export default HomePage;