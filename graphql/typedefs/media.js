const Media = `
  enum MediaType {
    IMAGE
    VIDEO
  }

  type Media {
    id: ID!
    userId: ID!
    postId: ID!
    mediaType: MediaType!
    src: String!
  }

  input MediaInput {
    mediaType: MediaType!
    src: String!
  }
`;

export default () => [Media];