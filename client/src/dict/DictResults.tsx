import { useState, useEffect } from 'react'
import './DictResults.scss'

const DictResults = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [state, setState] = useState({})

  const Tabs: string[] = ['meaning', 'synonyms', 'antonyms']

  return (
    <>
      <span className="dict-results__content">
        <h3>word</h3>
        Searching information for {props.word}...
        <h3>here it is...</h3>
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

export default DictResults
