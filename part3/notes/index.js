require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/notes', (request, response) => {
    Note.find({})
      .then(notes => {
        response.json(notes)
      })
  })

  app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id).then(note => {
      if (note){
        response.json(note)
      }else{
        response.status(404).end()
      }

    })
    .catch(error => {
      next(error)
    })
  })

  app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndRemove(id)
      .then( result => {
        console.log(result)
        response.status(204).end()
      })
      .catch(error => next(error))

  })


  app.post('/api/notes', (request, response, next) => {
    const body = request.body
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
      })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
      content: body.content,
      important: body.important
    }

    Note.findByIdAndUpdate(
      request.params.id, 
      note, 
      {new: true, runValidators: true, context: 'query'})
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))

  })

  const errorHandler = (error, request, response, next) => {
    console.log(error.message)
  
    if (error.name === 'CastError'){
      return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({error: error.message})
    }

    next(error)
  }
  
  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })