import Media from './media';
import Post from './post';
import Comment from './comment';
import User from './user';

const SchemaDefinition = `
  type Query {
    allUsers: [User!]!
    me: User
    searchUsers(query: String!): [User]!
    allPosts: [Post!]
    singlePost(id: ID!): Post
    userPosts(userId: ID!): [Post!]!
    userMedia(userId: ID!): [Media!]!
    userComments(userId: ID!): [Comment!]!
    postComments(postId: ID!): [Comment!]!
  }

  type Mutation {
    register(userInput: UserInput!): User
    login(loginInput: LoginInput!): Boolean
    updateCurrentUser(updateUserInput: UpdateUserInput!): [Int!]!
    deleteUser(email: String!): Int!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload
    createPost(postInput: PostInput!, mediaInput: MediaInput!): Post
    deletePost(postId: ID!, userId: ID!): Int!
    createComment(commentInput: CommentInput!): Comment
    deleteComment(commentId: ID!, userId: ID!): Int!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default () => [SchemaDefinition, Media, Post, User, Comment];