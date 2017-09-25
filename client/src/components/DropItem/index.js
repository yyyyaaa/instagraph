import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

const DropItem = (props) => {
  if (!props.id) {
    return null;
  }

  const { active } = props;
  
  return (
    <a className={classnames('dropitem', {
      'active': active
    })}
        href="https://google.com.vn" target="_blank" rel="noopener noreferrer"
    >
      <div className="media">
        <figure className="media-left">
          <p className="image is-32x32">
            <img src="http://bulma.io/images/placeholders/128x128.png" alt="pic"/>
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p><strong>{props.username}</strong></p>
            <p><small>{props.email}</small></p>
          </div>
        </div>
      </div>  
    </a>
  );
};

DropItem.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  any: PropTypes.bool.isRequired,
};

export default DropItem;