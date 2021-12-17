import { stringify } from "querystring"

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
export interface IWordInfo {
  word: string
  phonetic: string
  phonetics: PhoneticDetail[]
  origin: string
  meanings: Meaning[]
  error: string
}

export const parseWordInfo = (wordInfo: any): IWordInfo[] => {
  if (!wordInfo || !wordInfo.data || wordInfo.data.length === 0) {
    console.log('returning error from parseWordInfo: ', [wordInfo])
    return [{
        error: 'Error: Failed to parse data returned by dictionary',
        word: '',
        phonetic: '',
        phonetics: [],
        origin: '',
        meanings: []
    }]
  }

  let wordInfoArray: IWordInfo[] = wordInfo.data.map((oneInterpretation:any) => {
    parse(oneInterpretation)
  })

  return wordInfoArray
}

const parse = (data: any): IWordInfo => {
  let wordInfo: IWordInfo = {
    error: '',
    word: '',
    phonetic: '',
    phonetics: [],
    origin: '',
    meanings: []
  }
  wordInfo.word = data.word ? data.word : ''
  wordInfo.phonetic = data?.word ? data.word : ''

  wordInfo.phonetics = data.phonetics.map((item:any) => {
    return { text: item.text, audio: item.audio }
  })

  wordInfo.origin = data.origin

  wordInfo.meanings = data.meanings.map((item_meaning:any) => {
    const pOfS = item_meaning.partOfSpeech
    const definitions = item_meaning.definitions.map((item_def:any) => {
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

  console.log('returning from parse: ', wordInfo)
  return wordInfo
}
