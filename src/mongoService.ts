import { MongoClient } from 'mongodb'

export interface meanderUserInterface {
  email: string,
  password: string,
  chatlets: string[],
  friends: string[]
}

let users: any

// this should be one time thing (factory / inject service / DI blah blah)
export const initConnection = async () => {
  const url = 'mongodb://localhost:27017'
  const client = new MongoClient(url)
  console.log(`mongo initializing client: ${url}`)

  await client.connect()
  console.log('mongo initiConnection client connected')

  const db = await client.db('meander')
  console.log('mongo initiConnection db meander obtained')

  users = await db.collection('meander_users')
  console.log('mongo initiConnection users collection obtained')

  return users
  console.log('mongo initiConnection done')
}

export const create = async (user: meanderUserInterface, callback: any)  => {
  try {
    const result = await users.insertOne(user)
    callback(JSON.stringify(result))
  } catch (e) {
    console.log("Mongo Create Error: " + e);
  } finally {
  }
}

export const read = async (email: string, callback: any) => {
  try {
    const result = await users.findOne({ email })
    callback(JSON.stringify(result))
    console.log(`Mongo DB read document ${email} successful`)
  } catch (e) {
    console.log("Mongo Read Error: " + e);
  } finally {
  }
}

export const update = async (user: meanderUserInterface, callback: any) => {
  try {
    const result = await users.updateOne(
      { email: user.email },
      {
        $set: {
          password: user.password,
        },
      },
      {
        upsert: true
      }
    )
    callback(JSON.stringify(result))
    console.log(`Mongo DB updated email`)
  } catch (err) {
    console.log(`Mongo update failed: ${err}`)
  } finally {
  }
}

export const remove = async (email: string ) => {
  try {
    const query = { email };
    const result = await users.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log(`Successfully deleted ${email} document.`);
    } else {
      console.log(`No documents matched ${email} Deleted 0 documents.`);
    }
  } finally {
  }
}