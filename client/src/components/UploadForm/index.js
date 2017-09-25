import React from 'react';
import { Field, reduxForm } from 'redux-form';
import * as Validations from '../Validations';

let UploadForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div className="field">
        <label htmlFor="src">URL</label>
        <Field 
          className="input" 
          name="src" 
          component={Validations.renderField}
          validate={[Validations.required, Validations.url]}
          type="text" 
          kind="input"
          placeholder="Link to the media"
        />
      </div>
      <div className="field">
        <label htmlFor="mediaType">Media Type</label>
        <div>
          <div className="select">
            <Field
              name="mediaType"
              component="select"
            >
              <option disabled defaultValue value="">Select a media type</option>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
            </Field>
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="src">Caption</label>
        <Field 
          className="textarea" 
          name="caption" 
          component={Validations.renderField}
          type="text" 
          kind="textarea"
          placeholder="Your caption plz"
        />
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" disabled={pristine || submitting}>Create post</button>
        </div>
        <div className="control">
          <button className="button is-link" disabled={pristine || submitting}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

UploadForm = reduxForm({
  form: 'upload'
})(UploadForm);

export default UploadForm;