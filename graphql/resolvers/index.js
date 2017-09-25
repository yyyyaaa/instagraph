import { merge } from 'lodash';
import UserResolvers from './user';
import PostResolvers from './post';
import CommentResolvers from './comment';
import QueryResolvers from './query';
import MutationResolvers from './mutation';

const Resolvers = merge(
  QueryResolvers, 
  MutationResolvers, 
  UserResolvers,
  PostResolvers,
  CommentResolvers
);

export default Resolvers;
