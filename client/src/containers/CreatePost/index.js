import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo'
import { connect } from 'react-redux';
import { withHeader } from '../../components/WithHeader';
import UploadForm from '../../components/UploadForm';
import FlashMessagesList from '../FlashMessagesList';
import { addFlashMessage } from '../../actions/flashMessages';

class CreatePost extends Component {
  submit = (values) => {
    console.log(values);
    const { caption, src, mediaType } = values;
    this.props.mutate({
      variables: {
        postInput: {
          caption
        },
        mediaInput: {
          mediaType,
          src
        }
      }
    }).then( ({data}) => {
      if(data.createPost) {
        // Dispatch redux action
        this.props.addFlashMessage({ 
          type: 'success', 
          text: 'Post created successfully!',
        });
      }
    }).catch(error => {
      console.log(error);
      this.props.addFlashMessage({ 
        type: 'error', 
        text: `error has occurred`,
      });
    });
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-half-mobile is-5-tablet is-4">
          <FlashMessagesList />
          <section className="section">
            <UploadForm onSubmit={this.submit} />
          </section>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
}

const CreatePostMutation = gql`
mutation CreatePostMutation($postInput: PostInput!, $mediaInput: MediaInput!) {
  createPost(postInput: $postInput, mediaInput: $mediaInput) {
    id
  }
}
`;

const mapDispatchToProps = (dispatch) => {
  return {
    addFlashMessage: (message) => {
      dispatch(addFlashMessage(message));
    }
  }
}

const CreatePostWithMutation = graphql(CreatePostMutation)(withHeader(CreatePost));

export default connect(null, mapDispatchToProps)(CreatePostWithMutation);