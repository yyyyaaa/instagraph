import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as Validations from '../Validations';

let LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <p>Login</p>
      
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
          <button className="button is-primary" disabled={pristine || submitting}>Log in</button>
        </div>
        <div className="control">
          <Link to="/register" disabled={pristine || submitting} className="button is-link">
            Register
          </Link>
        </div>
        <div className="control">
          <button className="button is-link" disabled={pristine || submitting}>Home</button>
        </div>
      </div>
    </form>
  );
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;