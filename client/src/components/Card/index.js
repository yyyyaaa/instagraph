import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

const Card = ({ media, caption, creator, children }) => (
  <div className="post card">
    <div className="media content">
      <figure className="media-left">
        <p className="image is-48x48 avatar">
          <img src="http://bulma.io/images/placeholders/128x128.png" alt="user" />
        </p>
      </figure>
      <div className="media-content">
        <Link to={`/users/${creator.id}/posts`}>
          <span>{creator.username}</span>
        </Link>
      </div>
    </div>

    <div className="card-image">
      <figure className="image is-4by3">
        <img src={media.src} alt={caption} />
      </figure>
    </div>

    <div className="card-content">
      <p className="content">{caption}</p>
      {children}
    </div>
  </div>
);

Card.propTypes = {
  media: PropTypes.shape({
    mediaType: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  creator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string.isRequired,
};

export default Card;