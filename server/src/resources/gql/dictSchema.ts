import { ApolloServer, gql } from 'apollo-server'
import { IWordInfo } from '../../wordResultParser'

export const typeDefs = gql`

  type Phonetics {
    text: String
    audio: String
  }

  type Definition {
    definition: String
    synonyms: [String]!
    antonyms: [String]!
  }

  type Meaning {
    partOfSpeech: String!
    definitions: [Definition]!
  }
  type WordInfo {
    word: String
    origin: String
    phonetic: String
    phonetics: [Phonetics]!
    meanings: [Meaning]!
  }

  type Query {
    getWordInfo(word: String!): WordInfo
  }
`
// End of Template String..

export const emptyWordInfo: IWordInfo = {
    error: '',
    word: '',
    phonetic: '',
    phonetics: [],
    origin: '',
    meanings: []
}


export const wordInfoSample = {
  word: 'post',
  origin: "late 16th century(as a heraldic term denoting the tail of an animal): from French, based on Latin cauda ‘tail’.Compare with cue2.queue(sense 1 of the noun) dates from the mid 19th century.",
  phonetic: 'pOst1',

  phonetics: [
    {
      text: 'kju',
      audio: '//ssl.gstatic.com/dictionary/static/sounds/20200429/queue--_gb_1.mp3',
    }
  ],
  meanings: [
    {
      partOfSpeech: 'noun',
      definitions: [
        {
          definition: 'a line or sequence of people or vehicles awaiting their turn to be attended to or to proceed.',
          synonyms: [
            'line',
            'row',
            'column',
            'file',
            'chain',
            'string',
            'stream',
            'procession',
            'train',
            'succession',
            'progression',
            'cavalcade',
            'sequence',
            'series',
            'waiting list',
            'reserve list',
            'breadline',
            'wait list',
            'backup',
            'waiting line',
            'crocodile',
            'traffic jam',
            'jam',
            'tailback',
            'gridlock',
            'traffic snarl',
            'snarl - up'
          ],
          antonyms: <string[]>[]
        },
        {
          definition: 'a list of data items, commands, etc., stored so as to be retrievable in a definite order, usually the order of insertion.',
          synonyms: [],
          antonyms: []
        },
        {
          definition: 'a plait of hair worn at the back.',
          synonyms: <string[]>[],
          antonyms: <string[]>[]
        }
      ]
    },
    {
      partOfSpeech: 'verb',
      definitions: [
        {
          definition: 'take ones place in a queue.',
          example: 'in the war they had queued for food',
          synonyms: [
            'line up',
            'form lines',
            'get into rows/ columns',
            'fall in',
            'file',
            'walk/move in line',
            'stand in a queue',
            'form a queue',
            'queue up',
            'wait in line',
            'form a line',
            'form a crocodile',
          ],
          antonyms: <string[]>[]
        },
        {
          definition: 'arrange in a queue.',
          example: 'input or output requests to a file are queued by the operating system',
          synonyms: [
            'queue up',
            'wait in line',
            'form a line',
            'form a crocodile',
          ],
          antonyms: <string[]>[]
        }
      ]
    }
  ]
}
