import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import filterArg from '../args/filter';
import MongoBook from '../mongo/MongoBook';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoMovie from '../mongo/MongoMovie';
import MongoUser from '../mongo/MongoUser';
import searchResultUnion from '../unions/SearchResult';

const searchQuery = {
    type: new GraphQLNonNull(new GraphQLList(searchResultUnion)),
    description: 'search for anything',
    args: {
        filter: (filterArg),
        query: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Query string',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const resBook: Array<any> = await MongoBook.find({
            title: { $regex: arg.query, $options: 'i' },
        });
        const resMovie: Array<any> = await MongoMovie.find({
            title: { $regex: arg.query, $options: 'i' },
        });
        const resLibrary: Array<any> = await MongoLibrary.find({
            name: { $regex: arg.query, $options: 'i' },
        });
        const resUser: Array<any> = await MongoUser.find({
            name: { $regex: arg.query, $options: 'i' },
        });

        return resBook
            .concat(resMovie)
            .concat(resLibrary)
            .concat(resUser)
            .slice(arg.filter.start, arg.filter.count);
    },
};
export default searchQuery;
