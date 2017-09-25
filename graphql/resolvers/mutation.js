import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { 
  requiresAuth, 
  requiresAdmin,
  ensuresSameUser,
} from '../permissions';

import {
  tryLogin,
  refreshTokens,
} from '../auth';

const MutationResolvers = {
  Mutation: {
    updateCurrentUser: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      // Only pick out non-null key-value pairs
      const updatedUser = _.pickBy(args.updateUserInput, _.identity);
      if (_.has(updatedUser, 'password')) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
      }
      return models.User.update(updatedUser, {
        where: {
          id: user.id
        }
      });
    }),
    deleteUser: (parent, args, { models }) => models.User.destroy({ where: args }),
    register: async (parent, args, { models }) => {
      const user = args.userInput;
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const registeredUser = await models.User.create({
        ...user,
        password: hashedPassword,
      });
      return registeredUser;
    },
    login: async (parent, { loginInput: { email, password } }, { res, models, SECRET, SECRET_2 }) => {
      const { token, refreshToken } = await tryLogin(email, password, models, SECRET, SECRET_2);
      res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      return true;
    },
    refreshTokens: (parent, { token, refreshToken }, { models, SECRET, SECRET_2 }) => 
      refreshTokens(token, refreshToken, models, SECRET, SECRET_2)
    ,
    createPost: requiresAuth.createResolver( async (parent, args, { models, user }) => {
      const postInput = {
        userId: user.id,
        ...args.postInput
      };
      const newPost = await models.Post.create(postInput);
      console.log(args.mediaInput);
      const mediaInput = {
        userId: user.id,
        postId: newPost.dataValues.id,
        ...args.mediaInput
      };
      const newMedia = await models.Media.create(mediaInput);

      return newPost;
    }),
    deletePost: ensuresSameUser.createResolver( (parent, args, { models, user }) =>
      models.Post.destroy({ 
        where: { 
          id: args.postId 
        }
      })
    ),
    createComment: requiresAuth.createResolver( async (parent, args, { models, user }) => {
      const commentInput = {
        userId: user.id,
        ...args.commentInput
      };

      const matchedUser = await models.User.findOne({ where: {id: user.id}});
      if(!matchedUser) {
        throw new Error('There is no user with that ID');
      }

      const matchedPost = await models.Post.findOne({ where: {id: args.commentInput.postId}});
      if(!matchedPost) {
        throw new Error('There is no post with that ID');
      }

      return models.Comment.create(commentInput);
    }),
    deleteComment: ensuresSameUser.createResolver( (parent, args, { models, user }) => 
      models.Comment.destroy({
        where: {
          id: args.commentId
        }
      })
    )
  }
};

export default MutationResolvers;