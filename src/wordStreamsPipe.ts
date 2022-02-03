import { getOperationDefinitionOrDie } from 'apollo-boost/node_modules/apollo-link/node_modules/apollo-utilities'
import * as stream from 'stream'
import { WordReadStream } from './wordReadStream'
import { WordTransformStream } from './wordTransformStream'

export const WordStreamsPipeline = (word: string, res: stream.Readable) => {

  stream.pipeline(
    new WordReadStream({}),
    new WordTransformStream({}),
    process.stdout,
    () => { }
  )
}