import { GraphQLObjectType } from 'graphql';
import createBookMutation from '../mutation/createBook';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBook: createBookMutation,
    },
});
