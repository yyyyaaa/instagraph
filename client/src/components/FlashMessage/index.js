import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { message: { text, type } } = this.props;
    
    return (
      <div className={classnames('notification', {
        'is-success': type === 'success',
        'is-danger': type === 'error',
        'is-info': type === 'info',
      })} >
        <button className="delete" onClick={this.onClick}></button>
        {text}
      </div>
    )
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
}

export default FlashMessage;