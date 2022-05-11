import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink,split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const token = localStorage.getItem('Token');


const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true,
    connectionParams: {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('Token');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});


// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);



const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache()
});









export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);





// import React from 'react';
// import App from './App';
// import ApolloClient , { createNetworkInterface } from 'apollo-client';
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
// import { ApolloProvider } from '@apollo/react-hooks';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// 
// 
// 
// 
// 
// 
// // import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// 
// const token = localStorage.getItem('Token');
// 
// const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/__PROJECT ID__`, {
//   reconnect: true,
//   connectionParams: {
//     headers: {
//         Authorization: "Bearer "+token
//     }// Pass any arguments you want for initialization
//   },
// })
// const authLink = setContext(() => {
//     const token = localStorage.getItem('Token');
//     return {
//         headers: {
//             Authorization: token ? `Bearer ${token}` : ''
//         }
//     };
// });
// 
// const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/__PROJECT ID__'})
// // Extend the network interface with the WebSocket
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient)
// const client = new ApolloClient({
//   networkInterface: networkInterfaceWithSubscriptions,
//   headers: {
//       Authorization: token ? `Bearer ${token}` : ''
//   },
// })
// 
// 
// const httpLink = createHttpLink({
//   uri: 'http://localhost:5000/'
// });
// 
// 
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });
// 
// export default (
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );


// 
// import React from 'react';
// import App from './App';
// import ApolloClient from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks';
// import { setContext } from 'apollo-link-context';
// 
// import { WebSocketLink } from 'apollo-link-ws';
// const GRAPHQL_ENDPOINT = "ws://localhost:3000/graphql";
// 
// const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
//   reconnect: true
// });
// 
// const link = new WebSocketLink(client);
