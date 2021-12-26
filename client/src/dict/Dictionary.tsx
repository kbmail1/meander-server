import './Dictionary.scss'
import DictResult from './DictResult'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const Dictionary = (props) => {
  const [word, setWord] = useState('')
  const [data, setData] = useState()
  const [dataAvail, setDataAvail] = useState(false)

  console.log(`Dictionary, props: ${[...Object.keys(props)]}`)

  const handleSearch = (e) => {
    // TODO: confirm if necessary...
    e.stopPropagation() // and preventDefault()?
    if (word && word.trim().length > 0) {
      setWord(word.trim())
    }
    console.log(`searching for word ${word}`)

    const url = `https://localhost:8888/rest/word/${word}`

    axios
      .get(url)
      .then((response) => {
        console.log('d... ', JSON.stringify(response.data, null, 2))
        setData(response.data)
        setDataAvail(true)
      })
      .catch((err) => {
        console.log(`get from ${url} failed.  Error: ${err}`)
      })
  }

  return (
    <>
      <div className="dict-query">
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
        />
      </div>

      {dataAvail && <DictResult word={word} info={data} />}
      {!dataAvail && (
        <div>Word {word} is not a dictionary word (American Standard)</div>
      )}
    </>
  )
}

export default Dictionary
