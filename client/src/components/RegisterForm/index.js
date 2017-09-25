import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as Validations from '../Validations';

let RegisterForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <p>Register new account</p>
      
      <div className="field">
        <label htmlFor="username">Username</label>
        <Field 
          className="input" 
          name="username" 
          component={Validations.renderField} 
          validate={[Validations.required, Validations.minLength2]}
          type="text" 
          kind="input"
          placeholder="Your username"
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <Field 
          className="input" 
          name="email" 
          component={Validations.renderField}
          validate={[Validations.required, Validations.email]}
          type="email" 
          kind="input"
          placeholder="Your email address"
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <Field 
          className="input" 
          name="password" 
          component="input" 
          type="password" 
          kind="input"
          placeholder="Your email address"
        />
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" disabled={pristine || submitting}>Create</button>
        </div>
        <div className="control">
          <button className="button is-link" disabled={pristine || submitting}>Back</button>
        </div>
      </div>
    </form>
  );
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RegisterForm;