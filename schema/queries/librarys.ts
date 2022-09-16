import { GraphQLList, GraphQLString } from 'graphql';
import filterArg from '../args/filter';
import MongoLibrary from '../mongo/MongoLibrary';
import Library from '../types/Library';

const librarysQuery = {
    type: new GraphQLList(Library),
    description: "Query all library",
    args: {
        filter: filterArg,
        query: {
            type: GraphQLString,
            description: 'Filter on the name of the library',
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        const res: Array<any> = await MongoLibrary.find(
            arg.query ? { name: arg.query } : {}
        )
            .skip(arg.filter.start)
            .limit(arg.filter.count < 100 ? arg.filter.count : 100);
        return res;
    },
};
export default librarysQuery;
