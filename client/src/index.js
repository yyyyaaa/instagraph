import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import reducers from './reducers';
import './index.css';
import App from './containers/App';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Register from './containers/Register';
import CreatePost from './containers/CreatePost';
import UserPosts from './containers/UserPosts';
import SinglePost from './containers/SinglePost';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = new createNetworkInterface({
  uri: "http://localhost:4000/graphql",
  opts: {
    credentials: 'include', // automatically send the cookies to server when making request
  }
});

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
  combineReducers({
    ...reducers,
    apollo: client.reducer(),
  }),
  {}, // Initial state
  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users/:userId/posts" component={UserPosts} />
        <Route exact path="/posts/create" component={CreatePost} />
        <Route exact path="/modal" component={SinglePost} />
        <Route exact path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
