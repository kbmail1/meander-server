import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { cache } from './dict/cache'
import { typeDefs } from './dict/types/dictSchema'

// old uri: 'http://localhost:4000',
// new server is combo & GQL listening at 8081.
// ... this allows a single proxy in CRA-loaded react client

const client = new ApolloClient({
  uri: 'http://localhost:8081',
  cache,
  typeDefs,
  resolvers: {},
})

const AppoloProviderComponent = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default AppoloProviderComponent
