import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  gql,
  graphql,
} from 'react-apollo';
import PostList from '../../components/PostList';
import Spinner from '../../components/Spinner';

class PostFeed extends Component {
  render() {
    const { data: { loading, error, allPosts }} = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <p>{error.message}</p>;
    } 

    return (
      <PostList posts={allPosts} />
    );
  }
}

PostFeed.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
}

const AllPostsQuery = gql`
  query AllPostsQuery {
    allPosts {
      id
      creator {
        id
        username
        email
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
      createdAt
    }
  }
`;

export default graphql(AllPostsQuery)(PostFeed);