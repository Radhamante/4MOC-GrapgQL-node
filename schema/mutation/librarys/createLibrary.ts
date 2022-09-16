import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Library from '../../types/Library';
import MongoLibrary from '../../mongo/MongoLibrary';
import MongoAdress from '../../mongo/MongoAdress';

const LibraryAddressInput = new GraphQLInputObjectType({
    name: 'LibraryInputMutation',
    fields: {
        long: { type: new GraphQLNonNull(GraphQLFloat) },
        lat: { type: new GraphQLNonNull(GraphQLFloat) },
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
    mutateAndGetPayload: async (input, context: any) => {
        if (!context.logged) {
            throw Error('User not logged');
        }
        if (!context.user.isAdmin) {
            return null;
        }
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
