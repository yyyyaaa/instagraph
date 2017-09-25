import Post from './post';
import Media from './media';
import Comment from './comment';

const User = `
  type User {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
    posts: [Post!]
    media: [Media!]
    comments: [Comment!]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean
  }

  input UpdateUserInput {
    username: String
    email: String!
    password: String
    isAdmin: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }
`;

export default () => [User, Post, Media, Comment];