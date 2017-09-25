import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { withHeader } from '../../components/WithHeader';
import LoginForm from '../../components/LoginForm';
import FlashMessagesList from '../FlashMessagesList';
import { addFlashMessage } from '../../actions/flashMessages';

class LoginPage extends Component {
  state = {
    redirectPath: ""
  }

  submit = (values) => {
    console.log(values);
    const { email, password } = values;
    this.props.mutate({
      variables: {
        loginInput: {
          email,
          password,
        }
      }
    })
    .then( ({data}) => {
      // login succeed
      if(data.login) {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You have signed in successfully!',
        });
        this.setState({ redirectPath: '/' });
      } else {
        this.props.addFlashMessage({
          type: 'info',
          text: "We can't find such account, wanna register instead?",
        });
        this.setState({ redirectPath: '/register' });
      }
    })
    .catch(error => {
      console.log('There was error sending query', error);
      this.props.addFlashMessage({
        type: 'error',
        text: 'An error has occurred, please try again later.',
      });
    });
  }

  render() {
    const { redirectPath } = this.state;
    if(redirectPath) {
      return <Redirect push to={redirectPath} />;
    }
    
    return (
      <div className="columns is-centered">
        <div className="column is-half-mobile is-half-tablet is-4-desktop">
          <FlashMessagesList />
          <section className="section">
            <LoginForm onSubmit={this.submit}/>
          </section>
        </div>
      </div>
    );
  }
}

const LoginMutation = gql`
mutation LoginMutation($loginInput: LoginInput!){
  login(loginInput: $loginInput)
}
`;

LoginPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFlashMessage: (message) => {
      dispatch(addFlashMessage(message));
    }
  }
}

const LoginPageWithMutation = graphql(LoginMutation)(withHeader(LoginPage));
export default connect(null, mapDispatchToProps)(LoginPageWithMutation);