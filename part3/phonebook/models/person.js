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

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /^(\d{2,3}-)?\d+$/.test(v)
            }
        },
        required: true,
    }
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
