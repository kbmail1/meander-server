import { useState } from 'react'
import Sonnet from './resources/Sonnet'
import Dictionary from './dict/Dictionary'

// import { Jumbotron } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function MainMenu() {
  const [key, setKey] = useState('dictionary')

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="dictionary" title="Dictionary">
        <Dictionary />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Sonnet />
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        <Sonnet />
      </Tab>
    </Tabs>
  )
}

export default MainMenu
