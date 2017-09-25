import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages';
import FlashMessage from '../../components/FlashMessage';

class FlashMessagesList extends Component {
  render() {
    const messages = this.props.messages.map(message => 
      <FlashMessage 
        key={message.id} 
        message={message} 
        deleteFlashMessage={this.props.deleteFlashMessage}
      />
    );

    return (
      <div>
        {messages}
      </div>
    )
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    messages: state.flashMessages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFlashMessage: (id) => {
      dispatch(deleteFlashMessage(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessagesList);