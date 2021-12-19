import { jsx as _jsx } from 'react/jsx-runtime'
import ReactDOM from 'react-dom'
import { React } from 'react'
import { App } from './App'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

import AppoloProviderComponent from './ApolloProvider'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:8081',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  _jsx(AppoloProviderComponent, {}, void 0),
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
