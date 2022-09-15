import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import filterInput from '../inputs/filterInput';
import MongoAdress from '../mongo/MongoAdress';
import MongoBook from '../mongo/MongoBook';
import MongoHistory from '../mongo/MongoHistory';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoMovie from '../mongo/MongoMovie';
import MongoUser from '../mongo/MongoUser';
import Book from '../types/Book';

const booksQuery = {
    type: new GraphQLNonNull(new GraphQLList(Book)),
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
        const res: Array<any> = await MongoBook.find({})
            .skip(arg.filter.start)
            .limit(arg.filter.count < 100 ? arg.filter.count : 100);
        return res;
    },
};

export default booksQuery;
