const sampleQueryForUIToMake = `

query Query {
  word {
    origin
    phonetic
    phonetics {
      text
      audio
    }
    meanings {
      definitions {
        synonyms
        antonyms
        definition
      }
      partOfSpeech
    }
    word
  }
}
`
