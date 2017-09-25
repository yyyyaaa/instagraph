import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';
import Thumbnail from '../Thumbnail';

const PostList = ({ posts, layout }) => (
  <div>
    { layout === "list" &&
      <div className="columns is-centered">
        <div className="column is-half">
          { posts.map(post => (
              <Post 
                key={post.id}
                id={post.id}
                caption={post.caption} 
                media={post.media} 
                creator={post.creator}
                comments={post.comments} 
                createdAt={post.createdAt}
              />
          ))}
        </div>
      </div>
    }
    { layout === "grid" &&
      <div className="tile is-ancestor">
        { posts.map(post => (
          <div key={post.id} className="tile is-parent is-4">
            <div className="tile is-child">
              <Thumbnail post={post} />
            </div>
          </div>
        ))}
      </div>
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string,
      media: PropTypes.shape({
        id: PropTypes.string.isRequired,
        mediaType: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
      }).isRequired
    })
  ).isRequired,
  layout: PropTypes.string,
};

PostList.defaultProps = {
  layout: 'list'
};

export default PostList;