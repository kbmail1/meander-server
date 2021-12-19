import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import './Dictionary.scss'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import DictResults from './DictResults'

// import { getDataFromTree } from '@apollo/client/react/ssr'
// map the FUCK - simple problem.

const Dictionary = (props) => {
  const [word, setWord] = useState('sit')
  const [choices, setChoices] = useState([])
  const [result, setResult] = useState('loading...')

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
  const handleSubmit = () => {
    console.log('submit: ', word, choices)
    axios.get('http://localhost:8081/word/sit').then((result) => {
      console.log('------')
      console.log(result)
      console.log('------end-----')
      // setResult(JSON.stringify(result.data, null, 2))
      setResult(JSON.stringify(result, null, 2))
    })
  }
  return _jsxs(
    'div',
    {
      className: 'dict-container',
      children: [
        _jsxs(
          'div',
          {
            className: 'dict-choices',
            children: [
              _jsx(
                'div',
                {
                  children: _jsx(
                    Form.Group,
                    {
                      className: 'mb-3',
                      controlId: 'formBasicPassword',
                      children: _jsx(
                        Form.Control,
                        { type: 'Word', placeholder: 'Word' },
                        void 0
                      ),
                    },
                    void 0
                  ),
                },
                void 0
              ),
              _jsxs(
                'div',
                {
                  children: [
                    _jsxs(
                      'div',
                      {
                        className: 'dict-choice',
                        children: [
                          _jsx(
                            'input',
                            {
                              name: 'sentence',
                              type: 'checkbox',
                              onChange: handleChoiceClicked,
                            },
                            void 0
                          ),
                          _jsx(
                            'label',
                            {
                              htmlFor: 'props.choice',
                              children: 'Use in a sentence',
                            },
                            void 0
                          ),
                        ],
                      },
                      void 0
                    ),
                    _jsxs(
                      'div',
                      {
                        className: 'dict-choice',
                        children: [
                          _jsx(
                            'input',
                            {
                              name: 'synonyms',
                              type: 'checkbox',
                              onChange: handleChoiceClicked,
                            },
                            void 0
                          ),
                          _jsx(
                            'label',
                            { htmlFor: 'props.choice', children: 'synonyms' },
                            void 0
                          ),
                        ],
                      },
                      void 0
                    ),
                    _jsxs(
                      'div',
                      {
                        className: 'dict-choice',
                        children: [
                          _jsx(
                            'input',
                            {
                              name: 'antonyms',
                              type: 'checkbox',
                              onChange: handleChoiceClicked,
                            },
                            void 0
                          ),
                          _jsx(
                            'label',
                            { htmlFor: 'props.choice', children: 'antonyms' },
                            void 0
                          ),
                        ],
                      },
                      void 0
                    ),
                    _jsx(
                      Button,
                      {
                        name: 'submit',
                        className: `dict-choice dict-choice__submit`,
                        onClick: async () => {
                          await handleSubmit()
                        },
                        children: 'Submit',
                      },
                      void 0
                    ),
                  ],
                },
                void 0
              ),
            ],
          },
          void 0
        ),
        _jsx(
          'div',
          {
            className: 'dict-results__container',
            children: _jsx(DictResults, { word: word, source: result }, void 0),
          },
          void 0
        ),
      ],
    },
    void 0
  )
}
export default Dictionary
//# sourceMappingURL=Dictionary.js.map
