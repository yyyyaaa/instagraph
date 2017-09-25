import User from './user';

const Comment = `
  type Comment {
    id: ID!
    postId: ID!
    content: String!
    creator: User!
  }

  input CommentInput {
    postId: ID!
    content: String!
  }

`;  

export default () => [Comment, User];