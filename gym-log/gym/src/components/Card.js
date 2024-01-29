// Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ imageSrc, altText, title, to }) => {
  const cardStyle = {
    width: '600px',
    height: '250px',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const titleStyle = {
    position: 'absolute',
    top: '270px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#FFC107',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '1.5em',
  };

  return (
    <Link to={to}>
      <div className="card" style={cardStyle}>
        <img src={imageSrc} alt={altText} className="card-image" style={imageStyle} />
        <div className="card-content" style={titleStyle}>
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
