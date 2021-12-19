import { wordInfoSample } from './dictSchema'

import axios from 'axios'
import { parseWordInfo } from '../../dictResultParser'

// TODO: check if available in redis. If not, get it from disctionary.
export const resolvers = {
  Query: {
    getWordInfo: async () => {
      const word = 'spaghetti'
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

      let result = await axios.get(url)
      return parseWordInfo(result.data)

      // getWordInfo: () => wordInfoSample,
    },
  }
}