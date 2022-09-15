import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import MongoLibrary from '../mongo/MongoLibrary';
import Library from '../types/Library';

const libraryQuery = {
    description: "Search for a movie by it's ID",
    type: Library,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the library',
        }
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const res = await MongoLibrary.findById(arg.id).exec();
        console.log(res)
        return res;
    },
};

export default libraryQuery;
