import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';

const CommentList = ({ comments }) => (
  <ul>
    { comments.map(comment => 
      <Comment 
        key={comment.id} 
        id={comment.id} 
        creator={comment.creator} 
        content={comment.content} 
      />
    )}
  </ul>
)

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      creator: PropTypes.object,
      content: PropTypes.string.isRequired,
    })
  )
}

export default CommentList;