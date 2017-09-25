import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import CommentList from '../../components/CommentList';
import CommentSection from '../CommentSection';
import './style.css';

class SinglePost extends Component {
  render() {
    const { post } = this.props;
    
    return (
      <Modal showModal={this.props.showModal} onClose={this.props.onClose}>
        <div className="post-single columns">
          <div className="column is-8">
            <figure className="image">
              { !post &&
                <Spinner />
              }
              { post &&
                <img src={post.media.src} alt={post.caption}/>
              }
            </figure>
          </div>

          <div className="column is-4">
            
            { post &&
              <div className="post-author">
                <div className="media">
                  <figure className="media-left">
                    <p className="image is-48x48 avatar">
                      <img src="http://bulma.io/images/placeholders/128x128.png" alt="user" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <Link to={`/users/${post.creator.id}/posts`}>
                      <span>{post.creator.username}</span>
                    </Link>
                  </div>
                </div>

                <div className="media" style={{marginTop: 0, borderBottom: "none"}}>
                  <div className="media-left">
                    <div className="content">
                      <Link to={`/users/${post.creator.id}/posts`}>
                        <span>{post.creator.username}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="media-content">
                    {post.caption}
                  </div>
                </div>
              </div>
            }
            
            { !post &&
              <div className="is-danger">
                <p className="content">
                  An error has occurred, we couldn't find the post.
                </p>
              </div>
            }

            { post &&
              <div className="post-commentSection">
                <div className="media-content comments-list">
                  <CommentList comments={post.comments} />
                </div>

                <div className="comment-form">
                  <CommentSection />
                </div>
              </div>
            }
            
          </div>
        </div>
      </Modal>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    showModal: state.modal
  }
}

export default connect(mapStateToProps)(SinglePost);