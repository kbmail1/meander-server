import { jsx as _jsx } from "react/jsx-runtime";
import App from './App';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './dict/cache';
import { typeDefs } from './dict/types/dictSchema';
// old uri: 'http://localhost:4000',
// new server is combo & GQL listening at 8081.
// ... this allows a single proxy in CRA-loaded react client
const client = new ApolloClient({
    uri: 'http://localhost:8081',
    cache,
    typeDefs,
    resolvers: {},
});
const AppoloProviderComponent = () => {
    return (_jsx(ApolloProvider, { client: client, children: _jsx(App, {}, void 0) }, void 0));
};
export default AppoloProviderComponent;
//# sourceMappingURL=ApolloProvider.js.map