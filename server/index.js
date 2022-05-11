const express  = require('express');
const { createServer }  = require('http');
const { PubSub,gql }  = require('apollo-server');
const { ApolloServer,  }  = require('apollo-server-express');
const mongoose = require('mongoose');
var fs = require('fs');

const typeDefs = gql(fs.readFileSync(__dirname.concat('/graphql/typeDefs.graphql'),'utf8'));
const resolvers = require('./graphql/resolvers')
const {MONGODB,UPLOAD_DIR} = require("./config");

if (!fs.existsSync(UPLOAD_DIR)){
    fs.mkdirSync(UPLOAD_DIR);
}
const app = express();
const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub})  
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);


mongoose
  .connect(MONGODB, { useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
    return (
        httpServer.listen({ port: PORT }, () => {
            console.log('Apollo Server on http://localhost:5000/graphql');
        })
    );
  })
  // .then((res) => {
  //   console.log(`Server running at ${res.url}`);
  // })
  .catch(err => {
    console.error(err)
  })