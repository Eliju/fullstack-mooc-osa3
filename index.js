const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv').config({path: '.env'})
const app = express()
const Person = require('./models/person')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('body', function getBody(req) {
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    } else {
        return ' '
    }
    
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req,res) => {
    let url = req.hostname
    if (url === 'localhost') {
        url = url.concat(':3001')
    }
    res.send(`Phonebook available in url http://${url}/api/persons`)
})

app.get('/api/persons', (req,res,next) => {
    Person.find({}).then(persons =>{
        res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (req,res,next) => {
    let size = 0
    Person.find({}).then(persons => {
        size = persons.length
        const curr_date = new Date()

        res.send(`Phonebook has info for ${size} people <br/><br/>${curr_date}`)
    })
    .catch(error => next(error))
    
})

app.get('/api/persons/:id', (req,res,next) => {
    const id = req.params.id
    Person.findById(id)
        .then(person =>{
            if (!person) {
                res.status(404).end()
            } else {
                res.json(person)
            }
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (req,res,next) => {
    const id = req.params.id
    Person.deleteOne({"_id":id})
        .then(result => {
            if (result.deletedCount === 1){
                res.status(204).end()
            } else {
                 res.status(404).end()
            }
            })
        .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {
    const body = req.body

    const person = new Person ({
        name: body.name,
        number: body.number,
    })
                
    person.save().then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormatted => {
            res.json(savedAndFormatted)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
    const body = req.body

    // only the field that is updated, otherwise raises an error when validators are on
    const person = {
        number: body.number
    }

    // runValidators:true => otherwise validation is not working on update
    Person.findByIdAndUpdate(req.params.id, person, {new: true, runValidators:true})  
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndPoint = (req,res) => {
    res.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndPoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    next(error.message)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})