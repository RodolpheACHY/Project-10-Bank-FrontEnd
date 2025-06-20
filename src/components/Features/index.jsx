import React from 'react';
import FeatureItem from '../FeatureItem';

function Features() {
  const featuresData = [
    {
      iconSrc: '/img/icon-chat.png',
      iconAlt: 'Chat Icon',
      title: 'You are our #1 priority',
      description:
        'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      iconSrc: '/img/icon-money.png',
      iconAlt: 'Money Icon',
      title: 'More savings means higher rates',
      description:
        'The more you save with us, the higher your interest rate will be!',
    },
    {
      iconSrc: '/img/icon-security.png',
      iconAlt: 'Security Icon',
      title: 'Security you can trust',
      description:
        'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature, index) => (
        <FeatureItem
          key={index}
          iconSrc={feature.iconSrc}
          iconAlt={feature.iconAlt}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

export default Features;
