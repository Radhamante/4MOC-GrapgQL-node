import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import MongoMovie from '../mongo/MongoMovie';
import Movie from '../types/Movie';

const movieQuery = {
    description: "Search for a movie by it's ID",
    type: Movie,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the movie',
        }
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const res = await MongoMovie.findById(arg.id).exec();
        console.log(res)
        return res;
    },
};

export default movieQuery;
