import { useState } from 'react'
import './DictResultContainer.scss'

const DictResultContainer = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [state, setState] = useState({})
  const Tabs: string[] = ['meaning', 'synonyms', 'antonyms']

  return (
    <>
      <span className="dict-results__content">
        <h4>{props.word}</h4>
        {JSON.stringify(props.wordInfo, null, 2)}
      </span>

      <span className="dict-results__menu">
        <button className="dict-results__menu-button">Meaning</button>
        <button className="dict-results__menu-button">Synonyms</button>
        <button className="dict-results__menu-button">Antonyms</button>
      </span>
    </>
  )
}

export default DictResultContainer
