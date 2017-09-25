import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withHeader } from '../../components/WithHeader';
import RegisterForm from '../../components/RegisterForm';
import { addFlashMessage } from '../../actions/flashMessages';

class RegisterPage extends Component {
  state = {
    redirectPath: ""
  }

  submit = (values) => {
    console.log(values);
    const { username, email, password } = values;
    this.props.mutate({
      variables: {
        userInput: {
          username,
          email,
          password,
        }
      }
    })
    .then( ({ data }) => {
      // register succeeds
      if(data.register) {
        // Dispatch redux action
        this.props.addFlashMessage({ 
          type: 'success', 
          text: 'You signed up successfully. Welcome to Instashit!',
        });
        this.setState({ redirectPath: "/" });
      }
    })
    .catch(error => {
      console.log('There was error sending query', error);
      this.props.addFlashMessage({ 
        type: 'error', 
        text: 'An error occurred, please try again later!',
      });
    });
  }

  render() {
    const { redirectPath } = this.state;
    if(redirectPath) {
      return <Redirect push to={redirectPath} />
    }

    return (
      <div className="columns is-centered">
        <div className="column is-half-mobile is-half-tablet is-4-desktop">
          <section className="section">
            <RegisterForm onSubmit={this.submit}/>
          </section>
        </div>
      </div>
    );
  }
}

const RegisterMutation = gql`
mutation RegisterMutation($userInput: UserInput!){
  register(userInput: $userInput){
    id
  }
}
`;

RegisterPage.PropTypes = {
  addFlashMessage: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFlashMessage: (message) => {
      dispatch(addFlashMessage(message));
    } 
  }
}

const RegisterPageWithMutation = graphql(RegisterMutation)(withHeader(RegisterPage));
export default connect(null, mapDispatchToProps)(RegisterPageWithMutation);
