import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ id, creator, content }) => (
  <li className="media" key={id}>
    <figure className="media-left">
      <p className="image is-32x32">
        <img src="http://bulma.io/images/placeholders/128x128.png" alt="user" />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <strong>{creator.username}</strong>&nbsp;
        <p>{content}</p>
      </div>
    </div>
  </li>
);

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string,
};

export default Comment;