import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="level">
    <div className="level-item">
      <Link to="/login">
        <span className="icon">
          <i className="fa fa-user"></i>
        </span>
      </Link>
    </div>
    <div className="level-item">
      <Link to="/posts/create">
        <span className="icon">
          <i className="fa fa-upload"></i>
        </span>
      </Link>      
    </div>
  </div>
);

export default Nav;