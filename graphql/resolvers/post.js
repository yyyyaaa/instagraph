const PostResolvers = {
  Post: {
    creator: ({ userId }, args, { models }) => {
      return models.User.findOne({
        where: {
          id: userId,
        }
      });
    },
    media: ({ id }, args, { models }) => {
      return models.Media.findOne({
        where: {
          postId: id
        }
      });
    },
    comments: ( { id }, args, { models }) => {
      return models.Comment.findAll({
        where: {
          postId: id
        }
      });
    }
  }
};

export default PostResolvers;