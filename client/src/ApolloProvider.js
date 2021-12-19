import { jsx as _jsx } from 'react/jsx-runtime'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
const client = new ApolloClient({
  uri: 'http://localhost:8081',
  cache: new InMemoryCache(),
})
const AppoloProviderComponent = () => {
  return _jsx(
    ApolloProvider,
    { client: client, children: _jsx(App, {}, void 0) },
    void 0
  )
}
export default AppoloProviderComponent
//# sourceMappingURL=ApolloProvider.js.map
