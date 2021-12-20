import './Dictionary.scss'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import _, { keys } from 'lodash'
import axios from 'axios'
import DictResultContainer from './DictResultContainer'
// import { getDataFromTree } from '@apollo/client/react/ssr'
import { gql, useLazyQuery } from '@apollo/client'

const Dictionary = (props) => {
  const [word, setWord] = useState('')
  const [choices, setChoices] = useState<string[]>([])
  const [wordInfo, setWordInfo] = useState({})

  console.log(`Dictionary, props: ${[...Object.keys(props)]}`)
  const handleChoiceClicked = (event) => {
    const name = event.target.name
    const isChecked = event.target.checked

    if (isChecked) {
      choices?.push(name)
      const set = new Set(choices)
      setChoices([...set])
    } else {
      const index = choices.indexOf(name)
      if (index !== -1) {
        choices.splice(name, 1)
        setChoices(choices)
      }
    }
    console.log('updated-choices: ', choices)
  }

  const restHandleSubmit = (e) => {
    // TODO: confirm if necessary...
    e.stopPropagation() // and preventDefault()?

    console.log('*****', word)
    if (!word || word.trim().length === 0) {
      // TODO show warning.
      console.log('Enter a word to look up ...')
    } else {
      console.log('----- word is', word)
      axios.get(`http://localhost:8081/rest/word/${word}`).then((result) => {
        console.log(result.data)
        setWordInfo(result.data)
        console.log('------end-----')
      })
    }
  }

  return (
    <div className="dict-container">
      <div className="dict-choices">
        <div>
          <input
            type="text"
            placeholder="Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <div>
          <div className="dict-choice">
            <input
              name="sentence"
              type="checkbox"
              onChange={handleChoiceClicked}
            />
            <label htmlFor="props.choice">Example usage</label>
          </div>
          <div className="dict-choice">
            <input
              name="synonyms"
              type="checkbox"
              onChange={handleChoiceClicked}
            />
            <label htmlFor="props.choice">synonyms</label>
          </div>
          <div className="dict-choice">
            <input
              name="antonyms"
              type="checkbox"
              onChange={handleChoiceClicked}
            />
            <label htmlFor="props.choice">antonyms</label>
          </div>
          <Button
            name="submit"
            className={`dict-choice dict-choice__submit`}
            onClick={restHandleSubmit}
          >
            Submit REST Query
          </Button>
        </div>
      </div>

      <div className="dict-results__container">
        <DictResultContainer
          word={word}
          wordInfo={wordInfo}
        ></DictResultContainer>
      </div>
    </div>
  )
}

export default Dictionary
