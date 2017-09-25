import React, { Component } from 'react';
import PostFeed from '../PostFeed';
import FlashMessagesList from '../FlashMessagesList';
import { withHeader } from '../../components/WithHeader';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  render() {
    return (
      <main className="main">
        <div className="App">
          <FlashMessagesList />
          <section className="section">
            <PostFeed />
          </section>
        </div>
      </main>
    );
  }
}

export default withHeader(App);
