import { GraphQLList } from 'graphql';
import filterInput from '../inputs/filterInput';
import MongoLibrary from '../mongo/MongoLibrary';
import Library from '../types/Library';

const libraryQuery = {
    type: new GraphQLList(Library),
    args: {
        filter: {
            type: filterInput,
            description: 'Filter values',
            defaultValue: {
                start: 0,
                count: 20,
            },
        },
    },
    resolve: async (obj: any, arg: any, context: any) => {
        if (!context.logged) {
            throw Error("User not logged")
        }
        const res: Array<any> = await MongoLibrary.find({})
        .skip(arg.filter.start)
        .limit(arg.filter.count < 100 ? arg.filter.count : 100);
    return res;
    },
};
export default libraryQuery;
