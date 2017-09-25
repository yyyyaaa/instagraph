import React, { Component } from 'react';
import Header from '../Header';

const WithHeader = ({ children }) => (
  <div className="container is-fluid is-fullhd">
    <Header />
    { children }
  </div>
)

export const withHeader = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WithHeader>
          <WrappedComponent {...this.props}/>
        </WithHeader>
      )
    }
  }
};