const UserResolvers = {
  User: {
    posts: ({ id }, args, { models }) => {
      models.Post.findAll({
        where: {
          userId: id
        }
      });
    },
    media: ({ id }, args, { models }) => {
      models.Media.findAll({
        where: {
          userId: id
        }
      });
    },
    comments: ({ id }, args, { models }) => {
      models.Comment.findAll({
        where: {
          userId: id
        }
      });
    },
  }
};

export default UserResolvers;