const express = require('express')
const morgan = require('morgan')

const app = express()


app.use(express.json())

morgan.token('payload', (req, res) =>  JSON.stringify(req.body) )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const infoMessage = `The phonebook has info for ${persons.length} people`
    const date = new Date()

    response.send(
        `<div><p>${infoMessage}</p><p>${date}</p></div>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    } else {
        response.status(404).json({"error": "Person ID not found"})
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const newId = Math.round(Math.random() * 10000)
    
    if (!body.name || !body.number){
        return response.status(400).json(
            {error: "make sure name and number are in the payload"}
        )
    }

    const matchedPerson = persons.find(person => person.name === body.name)
    if (matchedPerson) {
        return response.status(400).json(
            {error: "name must be unique"}
        )
    }
    
    body.id = newId

    persons = persons.concat(body)
    response.json(body)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})