import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import filterArg from '../args/filter';
import MongoMovie from '../mongo/MongoMovie';
import Movie from '../types/Movie';

const moviesQuery = {
    type: new GraphQLNonNull(new GraphQLList(Movie)),
    args: {
        filter: filterArg,
        query: {
            type: GraphQLString,
            description: 'Filter on the title of the movie',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const resMovies: Array<any> = await MongoMovie.find(
            arg.query ? { title: { $regex: arg.query, $options: 'i' } } : {}
        )
            .skip(arg.filter.start)
            .limit(arg.filter.count < 100 ? arg.filter.count : 100);
        resMovies.forEach((movie) => (movie.userCanBorrow = true));
        return resMovies;
    },
};

export default moviesQuery;
