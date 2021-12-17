import { result } from 'lodash'

export interface PhoneticDetail {
  text: string
  audio: string
}
export interface Definition {
  definition: string
  example: string
  synonyms: string[]
  antonyms: string[]
}
export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}
export interface DictResultObject {
  word: string
  phonetic: string
  phonetics: PhoneticDetail[]
  origin: string
  meanings: Meaning[]
}

export const parseResult = (src): DictResultObject => {
  const result: DictResultObject = {
    word: '',
    phonetic: '',
    phonetics: [],
    origin: '',
    meanings: [],
  }

  if (!src || !src.data || src.data.length === 0) {
    return result
  }

  const data = src.data[0]
  result.word = data.word ? data.word : ''
  result.phonetic = data?.word ? data.word : ''

  result.phonetics = data.phonetics.map((item) => {
    return { text: item.text, audio: item.audio }
  })

  result.origin = data.origin

  result.meanings = data.meanings.map((item_meaning) => {
    const pOfS = item_meaning.partOfSpeech
    const definitions = item_meaning.definitions.map((item_def) => {
      return {
        definition: item_def.definition,
        example: item_def.example,
        synonyms: [...item_def.synonyms],
        antonyms: [...item_def.antonyms],
      }
    })
    return {
      partOfSpeech: pOfS,
      definitions,
    }
  })

  console.log('START asdfadsfadfasdfadsfadfasdf')
  console.log(result)
  console.log('END asdfadsfadfasdfadsfadfasdf')
  return result
}
