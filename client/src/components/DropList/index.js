import React, { Component } from 'react';
import DropItem from '../DropItem';
import './style.css';

class DropList extends Component {
  renderNotFound() {
    return (
      <div className="droplist">
        <div className="triangle-icon"></div>
        <div className="results">
          <div className="media">
            <div className="media-content">
              <div className="content">
                <p><small>No Results found.</small></p>
              </div>
            </div>
          </div>  
        </div>
      </div>
    )
  }

  render() {
    const { users, cursor } = this.props;
    if(users.length === 0) {
      return this.renderNotFound();
    }

    return (
      <div className="droplist">
        <div className="triangle-icon"></div>
        <div className="results">
          <ul>
            { users.map( (user, idx) => (
                <DropItem 
                  key={user.id} 
                  id={user.id} 
                  username={user.username}
                  email={user.email}
                  active={cursor === idx}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
};

export default DropList;