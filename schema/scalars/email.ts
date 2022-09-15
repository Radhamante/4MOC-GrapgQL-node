import { GraphQLScalarType, Kind } from 'graphql';

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const GraphQLEmail = new GraphQLScalarType({
    name: 'Email',
    description: "Verify if it's an email",
    parseValue(value: any) {
        if (!validateEmail(value)) {
            throw Error('Email is not a valid one');
        }
        return value;
    },
    serialize(value: any) {
        return value;
    },
    parseLiteral(ast: any) {
        if (!validateEmail(ast.value)) {
            throw Error('Email is not a valid one');
        }
        return ast.value;
    },
});

export default GraphQLEmail;
