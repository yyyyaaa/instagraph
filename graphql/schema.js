import { 
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import SchemaDefinition from './typedefs';
import Resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition],
  resolvers: Resolvers,
});

// addMockFunctionsToSchema({ schema });
export default schema;