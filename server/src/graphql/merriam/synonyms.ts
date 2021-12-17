import path from 'path'
import  fs from 'fs'
import axios from 'axios'

export const getSynonyms = async (word: string) => {

  const urlPrefix = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
  // const url = `${urlPrefix}${word}`
  const url = `${urlPrefix}apathy`
  console.log(`url: ${url}`)

  // const resp = await axios.get(url)
  return ['disinterest', 'this', 'that']


}