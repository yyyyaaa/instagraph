import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import CommentForm from '../../components/CommentForm';
import { addFlashMessage } from '../../actions/flashMessages';
import { checkAuth, getUserId } from '../../lib/auth';

class CommentSection extends Component {
  submit = (values) => {
    const { postId, addFlashMessage } = this.props;
    const userId = getUserId();
    
    if(!checkAuth()) {
      addFlashMessage({
        type: 'error',
        text: 'You have to log in to comment.',
      });
    } else {
      this.props.mutate({
        variables: {
          commentInput: {
            postId: postId,
            content: values.comment,
          }
        }
      }).then( ({data}) => {
        console.log(data);
      }).catch(error => {
        console.log(error.name);

        addFlashMessage({ 
          type: 'error', 
          text: `Please log in to comment!`,
        });
      });
    }
  }

  render() {
    return (
      <CommentForm onSubmit={this.submit} />
    )
  }
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
  mutate: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
}

const SubmitCommentMutation = gql`
mutation SubmitCommentMutation($commentInput: CommentInput!) {
  createComment(commentInput: $commentInput) {
    id
    postId
    content
    creator {
      id
      username
    }
  }
}
`;

const mapDispatchToProps = dispatch => {
  return {
    addFlashMessage: (message) => {
      dispatch(addFlashMessage(message));
    }
  }
}

const CommentSectionWithMutation = graphql(SubmitCommentMutation)(CommentSection);
export default connect(null, mapDispatchToProps)(CommentSectionWithMutation);