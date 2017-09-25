import { reducer as formReducer } from 'redux-form';
import flashMessages from './flashMessages';
import modal from './modal';

export default {
  form: formReducer,
  flashMessages,
  modal,
};
