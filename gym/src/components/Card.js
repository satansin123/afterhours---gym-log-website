// Card.js
import React from 'react';

const Card = ({ imageSrc, altText, title }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={altText} />
      {title}
    </div>
  );
};

export default Card;
