import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import CommentList from '../CommentList';
import CommentSection from '../../containers/CommentSection';
import './style.css';

const Post = ({ id, caption, media, comments, creator }) => (
  <Card 
    media={media} 
    caption={caption}
    creator={creator}
  >
    <CommentList comments={comments} />
    <CommentSection postId={id}/>
  </Card>
);

Post.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string,
  creator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  media: PropTypes.object,
  comments: PropTypes.array,
};

export default Post;