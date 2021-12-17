import { useState, useEffect } from 'react'
import './DictResults.scss'
import * as parser from './DictResultParser'

const DictResults = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [state, setState] = useState({})

  const Tabs: string[] = ['meaning', 'synonyms', 'antonyms']

  return (
    <>
      <span className="dict-results__content">
        Results for word: {props.word}
        {JSON.stringify(parser.parseWordInfo(props.wordInfo))}
        {props.children}
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
