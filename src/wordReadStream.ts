import * as fs from 'fs'
import { countBy } from 'lodash'
import * as stream from 'stream'

const max_words = 370102
const fname = './src/resources/words_shufed.txt'
const line_no = Math.floor(Math.random() * (max_words)) + 1
let word: string = ''
let last_no = 0

let rs = fs.createReadStream(fname, {
  flags: 'r',
  encoding: 'utf-8',
  fd: null,
  highWaterMark: 1024
})

export class WordReadStream extends stream.Readable {

  constructor(opts: any) {
    super(opts)
  }

  _read() {
    rs.on('end', () => {
      // console.log(`${word}`)
      // process.stdout.write(word)
      rs.close()
      rs.destroy()
      this.push(word)
      this.push(null)
    })

    rs.on('data', (chunk) => {
      let lines = String(chunk).split('\n')
      if (last_no + lines.length >= +line_no) {
        word = lines[+line_no - last_no - 1]
        rs.emit('end')
      } else {
        last_no += lines.length - 1
      }
    })
  }

  _destroy() {
    rs = null
  }
}