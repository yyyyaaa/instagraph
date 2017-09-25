const CommentResolvers = {
  Comment: {
    creator: ({ userId }, args, { models }) =>
      models.User.findOne({
        where: { id: userId }
      })
  }
};

export default CommentResolvers;