import { wordInfoSample } from './dictSchema'

// TODO: check if available in redis. If not, get it from disctionary.
export const resolvers = {
    Query: {
      getWordInfo: () => wordInfoSample,
    },
  }