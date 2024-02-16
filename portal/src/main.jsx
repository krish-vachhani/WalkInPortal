import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4452/graphql',
});
const authLink = setContext((_, {headers}) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('authToken') || "";
    console.log(localStorage.getItem('authToken'))
    // Return the headers to the context so HTTP link can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : '',
        },
    };
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
)
