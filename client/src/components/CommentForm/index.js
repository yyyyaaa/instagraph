import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as Validations from '../Validations';

class CommentForm extends Component {
  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      console.log("Fucking enter");
      this.props.submit();
    }
  }
  
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
  
    return (
      <form 
        onSubmit={handleSubmit} 
        onKeyPress={this.handleKeyPress}
      >
        <div className="field">
          <div className="control">
            <Field 
              className="textarea" 
              name="comment" 
              style={{ margin: "1em 0" }} 
              component={Validations.renderField} 
              validate={[Validations.minLength1]}
              kind="textarea"
              placeholder="Add your comment"
              rows="1"
            />
          </div>
        </div>
      </form>
    );
  }
}

CommentForm = reduxForm({
  form: 'comment',
})(CommentForm);

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CommentForm;