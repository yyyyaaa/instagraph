import React from 'react';

export const required = value => (value ? undefined : 'Required');
const minLength = min => value =>
value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const minLength1 = minLength(1);
export const email = value => 
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined
export const url = value => 
value && !/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(value)
  ? 'Not a URL'
  : undefined

export const renderField = ({ input, type, kind, placeholder, cols, rows, meta: { touched, error, warning, invalid, pristine } }) => (
  <div>
    {
      kind === "textarea" &&
      <textarea 
        className={(touched && invalid) ? "textarea is-danger" : "textarea"} {...input} 
        type={type} 
        placeholder={placeholder}
        cols={cols}
        rows={rows}
      />
    }

    {
      kind === "input" &&
      <input className={(touched && invalid) ? "input is-danger" : "input"} {...input} type={type} placeholder={placeholder} />
    }
    {touched && ((error && <span className="help is-danger">{error}</span>) || (warning && <span className="help is-warning">{warning}</span>))}
  </div>
);
