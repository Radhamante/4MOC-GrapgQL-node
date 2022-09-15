import { GraphQLNonNull, GraphQLString } from 'graphql';
import filterInput from '../inputs/filterInput';
import MongoBook from '../mongo/MongoBook';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoUser from '../mongo/MongoUser';
import searchResultUnion from '../unions/SearchResult';

const searchQuery = {
    type: searchResultUnion,
    description: 'search for anything',
    args: {
        filter: {
            type: filterInput,
            description: 'Filter values',
            defaultValue: {
                start: 0,
                count: 20,
            },
        },
        query: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Query string"
        }
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error("User not logged")
        }
        const resLibrary: Array<any> = await MongoLibrary.find({name: arg.query}).exec()
        const resBook: Array<any> = await MongoBook.find({title: arg.query}).exec()
        const resUser: Array<any> = await MongoUser.find({name: arg.query}).exec()

        return resLibrary//.concat(resBook).concat(resUser).slice(arg.filter.start, arg.filter.end);
    },
};
export default searchQuery;
