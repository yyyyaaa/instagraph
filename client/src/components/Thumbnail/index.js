import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/modal';
import SinglePost from '../../containers/SinglePost';
import './style.css';

class Thumbnail extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <div className="thumbnail" onClick={this.props.toggleModal}>
            { post.media.mediaType === 'IMAGE' &&
              <figure className="image is-square">
                <img src={post.media.src} alt={post.alt} />
              </figure>
            }
            { post.media.mediaType === 'VIDEO' &&
              <div className="video">
                <video width="200" height="200" alt={post.alt} >
                  <source src={post.media.src} type="video/mp4" />
                </video>
              </div>
            }
        </div>
        <SinglePost post={post} onClose={this.props.toggleModal}/>
      </div>
    )
  }
}

Thumbnail.propTypes = {
  post: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => {
      dispatch(toggleModal());
    }
  }
}

export default connect(null, mapDispatchToProps)(Thumbnail);