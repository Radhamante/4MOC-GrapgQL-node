import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { book1, library1 } from '../../fakeDB/fake';
import bookGenre from '../enum/bookGenre';
import Library from '../types/Library';
import MongoBook from '../mongo/MongoBook';
import Address from '../types/Address';
import MongoLibrary from '../mongo/MongoLibrary';
import MongoAdress from '../mongo/MongoAdress';

const LibraryAddressInput = new GraphQLInputObjectType({
    name: 'LibraryInputMutation',
    fields: {
        long: { type: GraphQLFloat },
        lat: { type: GraphQLFloat },
        name: { type: GraphQLString },
    },
});

const createLibraryMutation = mutationWithClientMutationId({
    name: 'createLibrary',
    description: 'Create a library',
    inputFields: {
        name: { type: GraphQLString },
        address: { type: LibraryAddressInput },
    },
    outputFields: {
        library: { type: Library },
    },
    mutateAndGetPayload: async (input) => {
        const session = await MongoLibrary.startSession();
        session.startTransaction();
        try {
            let createdAddress = await MongoAdress.findOne(
                input.address
            ).exec();
            console.log('--------- createdAddress ----------');
            console.log(createdAddress);
            if (!createdAddress) {
                createdAddress = await MongoAdress.create(input.address);
            }
            const createdLibrary = await MongoLibrary.create({
                address: createdAddress,
                name: input.name,
            });
            console.log('--------- createdLibrary ---------');
            console.log(createdLibrary);
            return { library: createdLibrary };
        } catch (error) {
            console.log(error);
        }
        await session.commitTransaction();
        session.endSession();
        return null;
    },
});

export default createLibraryMutation;
