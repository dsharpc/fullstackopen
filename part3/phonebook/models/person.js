const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false)


mongoose.connect(uri)
    .then(result => {
        console.log('Successfully connected to MongoDB')
    })
    .catch(error => {
        console.log("Connection to Mongo DB failed:", error.message)
        process.exit(1)
    })

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
