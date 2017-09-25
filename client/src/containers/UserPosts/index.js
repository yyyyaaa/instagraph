import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import { withHeader } from '../../components/WithHeader';
import PostList from '../../components/PostList';
import Spinner from '../../components/Spinner';

class UserPosts extends Component {
  render() {
    const { data: { loading, error, userPosts }} = this.props;
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    if (userPosts.length === 0) {
      return (
        <div className="notification is-danger">
          <p>
            No posts found.
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="columns is-centered">
          <div className="column content is-half">
            <p>User: {userPosts[0].creator.username}</p>
            <small>Email: {userPosts[0].creator.email}</small>
          </div>
        </div>
        <PostList posts={userPosts} layout="grid"/>
      </div>
    );
  }
}

const UserPostQuery = gql`
  query getUserPosts($userId: ID!) {
    userPosts(userId: $userId) {
      id
      creator {
        id
        username
        email
        isAdmin
      }
      caption
      media {
        id
        mediaType
        src
      }
      comments {
        id
        content
        creator {
          id
          username
          email
        }
      }
    }
  }
`;

const UserPostsWithData = graphql(UserPostQuery, {
  skip: props => !props.match.params.userId,
  options: ({ match }) => ({ variables: { userId: match.params.userId }}),
})(UserPosts);

export default withHeader(UserPostsWithData);