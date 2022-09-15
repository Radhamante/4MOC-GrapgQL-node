import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './env';
import MongoUser from './schema/mongo/MongoUser';

const buildContext = async (req: any) => {
    const headersAuthorization = req.headers.authorization
    let context = {
        user: {},
        logged: false
    }
    if(headersAuthorization) {
        try {
            const token: any = jwt.verify(headersAuthorization, JWT_SECRET_KEY);
            const user = await MongoUser.find({email:(token.email)}).exec()
            context.user = user
            context.logged = true
        } catch (e) {
            return null;
        }
    }
    return context
}

const DefaultQuery = `query DefaultQuery {}`;
var app = express();
app.use(
    '/graphql', 
    graphqlHTTP(async (req) => ({
        schema: schema,
        context: await buildContext(req),
        graphiql: {
            defaultQuery: DefaultQuery,
        },
    }))
);

const MONGO_USER = 'admin';
const MONGO_PASSWORD = 'admin';
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wsixukh.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(4000);
        console.log(
            'Running a GraphQL API server at http://localhost:4000/graphql'
        );
    })
    .catch((error: any) => {
        throw error;
    });
