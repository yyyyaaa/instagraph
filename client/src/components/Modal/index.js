import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

class Modal extends Component {
  render() {
    const { showModal } = this.props;
    return (
      <div className={classnames('modal', {
        'is-active': showModal,
      })}>
        <div className="modal-background" onClick={this.props.onClose}></div>
        <div className="modal-card">
          {this.props.children}
        </div>
        <button className="modal-close is-large" onClick={this.props.onClose}></button>
      </div>
    )
  }
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;