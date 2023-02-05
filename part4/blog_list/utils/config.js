require('dotenv').config()

const PORT = process.env.PORT
const env = process.env.NODE_ENV
let MONGODB_URI = process.env.MONGODB_URI

if (env === 'test'){
  MONGODB_URI = process.env.MONGODB_TEST_URI
}


module.exports = {
  PORT, MONGODB_URI
}