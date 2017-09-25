import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const NotFound = () => (
  <div className="not-found text-wrapper">
    <div className="title" data-content="404">
        404
    </div>

    <div className="subtitle" data-content="Oops, the page you're looking for doesn't exist">
        Oops, the page you're looking for doesn't exist.
    </div>

    <div className="buttons">
        <Link className="button" to="/">Go to homepage</Link>
    </div>
  </div>
)

export default NotFound;