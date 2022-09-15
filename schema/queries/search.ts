import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import filterArg from '../args/filter';
import MongoBook from '../mongo/MongoBook';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';
import searchResultUnion from '../unions/SearchResult';

const searchQuery = {
    type: new GraphQLList(searchResultUnion),
    description: 'search for anything',
    args: {
        filter: filterArg,
        query: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Query string',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const resLibrary: Array<any> = await MongoLibrary.find({
            name: { $regex: arg.query, $options: 'i' },
        });
        const resBook: Array<any> = await MongoBook.find({
            title: { $regex: arg.query, $options: 'i' },
        });
        const resUser: Array<any> = await MongoUser.find({
            name: { $regex: arg.query, $options: 'i' },
        });

        return resLibrary
            .concat(resBook)
            .concat(resUser)
            .slice(arg.filter.start, arg.filter.end)
            .slice(arg.filter.start, arg.filter.count);
    },
};
export default searchQuery;
