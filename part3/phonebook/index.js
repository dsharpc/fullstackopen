require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())

morgan.token('payload', (req, res) =>  JSON.stringify(req.body) )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

app.use(express.static('build'))

app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const numPeople = persons.length
            const infoMessage = `The phonebook has info for ${numPeople} people`
            const date = new Date()
        
            response.send(
                `<div><p>${infoMessage}</p><p>${date}</p></div>`
            )
        })

})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).json({error: "Person ID not found"})
            }

        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(res => {
            console.log(res)
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number){
        return response.status(500).json(
            {error: "make sure name and number are in the payload"}
        )
    }

    const newPerson = new Person({name: body.name, number: body.number})
    newPerson.save()
        .then(addedPerson => {
            response.json(addedPerson)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    Person.findByIdAndUpdate(id, {name: body.name, number: body.number}, {new: true})
        .then(newPerson => {
            response.json(newPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError"){
        response.status(500).json({error: "malformatted id"})
    }
    next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})