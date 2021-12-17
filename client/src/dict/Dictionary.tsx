import './Dictionary.scss'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import _, { keys } from 'lodash'
import axios from 'axios'
import DictResults from './DictResults'
// import { getDataFromTree } from '@apollo/client/react/ssr'

// map the FUCK - simple problem.

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

  const handleSubmit = (e) => {
    e.stopPropagation()

    console.log('*****', word)
    if (!word || word.trim().length === 0) {
      // TODO show warning.
      console.log('Enter a word to look up ...')
    } else {
      console.log('----- word is', word)
      axios.get(`http://localhost:4000/word/${word}`).then((result) => {
        console.log('------')
        console.log(result)
        setWordInfo(result)
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="dict-results__container">
        <DictResults word={word} wordInfo={wordInfo}></DictResults>
      </div>
    </div>
  )
}

export default Dictionary
