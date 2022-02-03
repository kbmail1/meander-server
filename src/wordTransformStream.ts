import fs from "fs";
import stream, { Transform } from "stream";
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
console.log(process.env.DICT_URL)

export class WordTransformStream extends Transform {
  constructor(options: stream.TransformOptions) {
    super(options)
  }

  defs: string[] = []
  synonyms: string[] = []
  antonyms: string[] = []
  examples: string[] = []
  getFromDictionary = (word: string) => {
    const urlPrefix = process.env.DICT_URL
    const url = `${urlPrefix}sit`
    console.log(`url: ${url}`)
    /*
    const resp = await axios.get(url)
    console.log('===============================')
    console.log('====== response.data: ', JSON.stringify(resp!.data, null, 2))
    console.log('===============================')
    let meanings = resp!.data!.meanings
    meanings.forEach((meaning: any) => {
      meaning.forEach((nextMeaning: any) => {
        this.defs.push(nextMeaning.definition)
        this.synonyms.push(nextMeaning.synonyms)
        this.antonyms.push(nextMeaning.antonyms)
        this.examples.push(nextMeaning.example)
      })
    });
    */

    return {
      definitions: [
        "be or remain in a particular position or state.",
        "(of a parliament, committee, court of law, etc.) be engaged in its business.",
        "take (an examination).",
        "live in someone's house while they are away and look after their pet or pets.",
        "the way in which an item of clothing fits someone.",
      ],
      synonyms: [
        "take a seat",
        "seat oneself",
        "settle down",
        "be seated",
        "take a chair",
        "perch",
        "install oneself",
        "ensconce oneself",
        "plant oneself",
        "plump oneself",
        "flop",
        "collapse",
        "sink down",
        "flump",
        "park oneself",
        "plonk oneself",
        "take a pew",
        "meet",
        "assemble",
        "convene",
        "be in session"
      ],
      antonyms: [
        "stand",
        "rise"
      ],
      examples: [
        "I sat next to him at dinner",
        "the fridge was sitting in a pool of water",
        "Parliament continued sitting until March 16",
        "pupils are required to sit nine subjects at GCSE",
        "Kelly had been cat-sitting for me",
        "the sit of her frock",
      ]
    }
    // console.log(`url: ${url}`)
  }


  data: any
  _transform(chunk: any, encoding: BufferEncoding, callback: stream.TransformCallback): void {
    // this.data += chunk
    this.data = JSON.stringify(this.getFromDictionary(chunk), null, 2)
    // this Callback is Important. otherwise stream just ends.
    callback(null)
  }
  _flush(callback: stream.TransformCallback): void {
    // callback(null, ''+this.data.length+'\n')
    callback(null, '' + this.data + '\n')
  }

}