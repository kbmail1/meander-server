import { gql } from "apollo-server";
import { getSynonyms } from "./merriam/synonyms";

const typeDefs = gql`
    type User {
        id: String
        name: String
    }

    type Query {
        sayHello: User
    }

    type Query {
        synonyms(word: String!): [String]
    }
`;

const resolvers = {
    Query: {
        sayHello: () => {
            console.log('resolver for sayHello')
            return { name: "hello qsdqsd", id: 2 };
        },
        synonyms: (word: string) => {
            word = 'apathy'
            console.log('resolver for synonyms: received word: ${word}')
            return getSynonyms(word)
        }
    },
};

export { resolvers, typeDefs };
