import { GraphQLSchema } from 'graphql';
import mutation from './types/Mutation';
import query from './types/Query';

export default new GraphQLSchema({ query, mutation });
