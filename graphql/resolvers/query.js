import { 
  requiresAdmin,
} from '../permissions';

const QueryResolvers = {
  Query: {
    allUsers: requiresAdmin.createResolver(
      (parent, args, { models }) => models.User.findAll()
    ),
    me: (parent, args, { models, user }) => {
      if (user) {
        return models.User.findOne({
          where: {
            id: user.id
          }
        });  
      }
      return null;
    },
    searchUsers: (parent, args, {models}) => models.User.findAll({
      where: {
        username: {
          $like: args.query
        }
      }
    }),
    allPosts: (parent, _ , {models}) => models.Post.findAll({}),
    singlePost: (parent, { id }, { models }) => models.Post.findOne({ where: { id } }),
    userPosts: (parent, { userId }, { models }) => models.Post.findAll({
      where: {
        userId: userId
      }
    }),
    userMedia: (parent, { userId }, { models }) => models.Media.findAll({
      where: {
        userId: userId
      }
    }),
    userComments: (parent, { userId }, { models }) => models.Comment.findAll({
      where: {
        userId: userId
      }
    }),
    postComments: (parent, { postId }, { models }) => models.Comment.findAll({
      where: {
        postId: postId
      }
    }),
  }
};

export default QueryResolvers;
