import React from 'react';

function FeatureItem({ iconSrc, iconAlt, title, description }) {
  return (
    <div className="feature-item">
      <img src={iconSrc} alt={iconAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureItem;