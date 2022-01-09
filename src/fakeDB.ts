import { crypto } from 'crypto'

console.log(crypto.createHash('sha256')
  .update('kundan123')
  .digest('hex'))