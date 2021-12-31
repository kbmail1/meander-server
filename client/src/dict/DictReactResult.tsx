import './DictReactResult.scss'
import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { NavItem } from 'react-bootstrap'
// import dotenv from 'dotenv'
import axios from 'axios'

// dotenv.config()

const DictReactResult = (props) => {
  const [genData, setGenData] = useState({
    error: '',
    word: '',
    phonetic: '',
    text: '',
    audio: '',
    origin: '',
  })

  let word = props.word
  if (!word || !(typeof word === 'string') || word.trim().length === 0) {
    console.log('invalid request.  skipping the loopup')
  }
  word = props.word.trim()

  const restUrl = `https://localhost:8888/rest/word/${props.word}`

  useEffect(() => {
    axios
      .get(restUrl)
      .then((res) => {
        if (res.data.error !== '') {
          console.log(`Error: get from ${restUrl} failed. Error: ${err}`)
          return
        }
        console.log('one', res.data)
        console.log('two', JSON.stringify(res.data, null, 2))
        setGenData({
          error: '',
          word: res.data.word,
          phonetic: res.data.word,
          origin: res.data.origin,
          text: res.data.phonetics[0].text,
          audio: res.data.phonetics[0].audio,
        })
        const nestedDetails = res.data.meanings.map((meaning) => {
          const partOfSpeech = meaning?.partOfSpeech
          const interpretations = meaning?.definitions.map((def) => {
            return {
              definition: def.definition || '',
              example: def.example || '',
              synonyms: def.synonyms || [],
              antonyms: def.antonyms || [],
            }
          })
          return { partOfSpeech, interpretations }
        })
        console.log('three', JSON.stringify(nestedDetails))
        /*
        // flatten.
        // const details = ([] as string[]).concat(...nestedDetails)
        // console.log(details)
        */
      })
      .catch((err) => {
        console.log(`Error: get from ${restUrl} failed. Error: ${err}`)
      })
  }, [restUrl, word])

  return (
    <div className="dict-react">
      <ul className="dict-react__ul">
        <li className="dict-react__li">
          <span className="dict-react__li__key">word</span>
          <span className="dict-react__li__val">{genData.word}</span>
        </li>
        <li className="dict-react__li">
          <span className="dict-react__li__key"> phonetic</span>
          <span className="dict-react__li__val">{genData.phonetic}</span>
        </li>
        <li className="dict-react__li">
          <span className="dict-react__li__key"> origin</span>
          <span className="dict-react__li__val"> {genData.origin}</span>
        </li>
        <li className="dict-react__li">
          <span className="dict-react__li__key"> text</span>
          <span className="dict-react__li__val">{genData.text}</span>
        </li>
        <li className="dict-react__li">
          <span className="dict-react__li__key"> audio</span>
          <span className="dict-react__li__val">{genData.audio}</span>
        </li>
      </ul>
    </div>
  )
}

export default DictReactResult
function err(err: any) {
  throw new Error('Function not implemented.')
}
