import './Dictionary.scss'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const Dictionary = (props) => {
  const [word, setWord] = useState('')
  const [data, setData] = useState('')

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
        const d = JSON.stringify(response.data, null, 2)
        console.log('d... ', d)
        setData(d)
      })
      .catch((err) => {
        setData('')
        console.log(`get from ${url} failed.  Error: ${err}`)
      })
  }

  return (
    <>
      <div className="dict-container">
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
      <div className="dict-data">
        <div>Receceived: </div>
        {data}
      </div>
    </>
  )
}

export default Dictionary
