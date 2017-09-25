import React from 'react';
import {
  Link
} from 'react-router-dom';
import Search from '../../containers/Search';
import Nav from '../Nav';
import logo from '../../images/logo.svg';
import './style.css';

const Header = () => (
  <nav className="navbar columns is-centered is-marginless">
    <div className="level column columns">
      <div className="columns column level-item is-marginless">
        <div className="column is-3 is-offset-8">
          <Link to="/" className="navbar-item">
            <img src={logo} alt="Instagraph: a shitty Instagram clone" width="112" height="28" />
          </Link>
        </div>
      </div>
      <div className="column level-item">
        <Search />
      </div>
      <div className="columns column level-item level-left is-marginless">
        <div className="column is-3">
          <Nav />
        </div>
      </div>
    </div>
  </nav>
);

export default Header;