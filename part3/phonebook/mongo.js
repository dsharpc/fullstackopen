const mongoose = require('mongoose')

const numParameters = process.argv.length

if (numParameters < 3){
  console.log("Please provide at least the password")
  process.exit(1)
}
const password = process.argv[2]
const uri = `mongodb+srv://dsharpc:${password}@cluster0.9azml07.mongodb.net/phonebookApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(uri)

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const person = mongoose.model('Person', personSchema)

if (numParameters === 3){
  person
    .find({})
    .then(result => {
      console.log(`Found ${result.length} records in the database:`)
      result.forEach(item => {
        console.log(`${item.name} -> ${item.number}`)
      })
      mongoose.connection.close()
      process.exit()
    })
}

if (numParameters === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const newPerson = new person({ name, number })

  newPerson
    .save()
    .then(result => {
      console.log(`Added ${result.name} with number: ${result.number} to phonebook`)
      process.exit()
    })
} else if(numParameters === 4 || numParameters > 5) {
  console.log("Wrong number of parameters given, please make sure it includes the db password and, optionally name and number of new contact")
  process.exit(1)
}