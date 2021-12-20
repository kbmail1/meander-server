import { useQuery, gql } from '@apollo/client'

const GET_WORD_INFO = gql`
  query getWordInfo {
    word
    origin
    phonetic
  }
`
export const DictResultContent = (props) => {
  const { loading, error, data } = useQuery(GET_WORD_INFO)

  if (data) {
    console.log(data)
    return (
      <span style={{ display: 'flex', justifyItems: 'flex-start' }}>
        <h3>{props.word}</h3>
        data
      </span>
    )
  } else if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    console.error(error)
    return <div>Error!</div>
  } else {
    return (
      <span style={{ display: 'flex', justifyItems: 'flex-start' }}>
        <h3>{props.word}</h3>
        data
      </span>
    )
  }
}
