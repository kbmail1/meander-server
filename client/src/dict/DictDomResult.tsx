import './DictDomResult.scss'
import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import { NavItem } from 'react-bootstrap'

//  TODO: chanage rest to use GQL..

const GET_WORD_INFO = gql`
  query getWordInfo {
    word
    origin
    phonetic
  }
`

export const DictDomResult = (props) => {
  const [activeTab, setActiveTab] = useState({
    tabId: '',
    dataId: '',
  })

  const TABID = '_tabid'
  const DATAID = '_dataid'

  const getDataIdFromTabId = (tabId: string) => {
    return tabId.split('_')[0] + DATAID
  }

  const nestedDetails = props.info.meanings.map((meaning) => {
    const partOfSpeech = meaning.partOfSpeech
    return meaning.definitions.map((def: any) => {
      return {
        partOfSpeech,
        meaning: def.definition,
        example: def.example,
        synonyms: def.synonyms,
        antonyms: def.antonyms,
      }
    })
  })
  // flatten.
  const details = ([] as string[]).concat(...nestedDetails)
  console.log(details)

  const handleClickTab = (e) => {
    const tabId = e.target.id
    const dataId: string = getDataIdFromTabId(tabId)
    setActiveTab({ tabId, dataId })
    console.log(`tab and data ids: ${tabId} and ${dataId}`)
  }
  // prepare elements - one per tab for one meaning

  const tabList = details.map((item, ind) => {
    return (
      <button
        key={ind}
        id={'' + ind + TABID}
        className="dict-result__def-choices__choice"
        onClick={handleClickTab}
      >
        {item?.partOfSpeech}
      </button>
    )
  })

  const dataList = details.map((item, ind) => {
    const dataId = '' + ind + DATAID

    return (
      <div
        key={ind}
        id={dataId}
        className={`dict-result__general ${
          activeTab?.dataId !== dataId ? 'display-none' : ''
        }`}
      >
        YO YO I AM DOM
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">meaning:</span>
          <span className="val-of-pair">{item?.meaning}</span>
        </div>
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">example:</span>
          <span className="val-of-pair">{item?.example}</span>
        </div>
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">synonyms:</span>
          <span className="val-of-pair">{item?.synonyms.join(', ')}</span>
        </div>
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">antonyms:</span>
          <span className="val-of-pair">{item?.antonyms.join(', ')}</span>
        </div>
      </div>
    )
  })

  return (
    <div className="dict-result">
      <div className="dict-result__general">
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">word:</span>
          <span className="val-of-pair">{props.info.word}</span>
        </div>
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">phonetic:</span>
          <span className="val-of-pair">{props.info.phonetic}</span>
        </div>
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">phonetics.audio:</span>
          <span className="val-of-pair">{props.info.phonetics[0].audio}</span>
        </div>
        <div className="dict_result__general__kvpair">
          <span className="key-of-pair">phonetic.text:</span>
          <span className="val-of-pair">{props.info.phonetics[0].text}</span>
        </div>
      </div>

      <div className="dict-result__detail">
        <div className="dict-result__def-choices">{tabList}</div>

        <div className="dict-result__general">{dataList}</div>
      </div>
    </div>
  )
}

export default DictDomResult
