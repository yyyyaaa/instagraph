import Media from './media';
import Comment from './comment';
import User from './user';

const Post = `
  type Post {
    id: ID!
    userId: ID!
    creator: User!
    caption: String
    media: Media!
    comments: [Comment!]
    createdAt: String!
  }

  input PostInput {
    caption: String
  }
`;

export default () => [Post, Media, Comment, User];