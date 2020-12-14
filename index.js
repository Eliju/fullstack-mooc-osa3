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

/* let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
] */

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
    // const person = phonebook.find((p => p.id === id))
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

/* const randomId = () => {
    let maxValue = 100000
    let Id = Math.floor(Math.random() * maxValue) + 1;
    while (phonebook.find(p => p.id === Id)) {
        if (maxValue <= phonebook.length) {
            maxValue *= 10
        }
        Id = Math.floor(Math.random() * maxValue) + 1;
    }
    return Id
} */

app.post('/api/persons', (req,res,next) => {
    const body = req.body

    if (!body.name){
        return res.status(400).json({
            error: 'Name is a mandatory field'
        })
    } else if (!body.number){
        return res.status(400).json({
            error: 'Number is a mandatory field'
        })
    } else {   
        Person.find({'name': body.name})
            .then(p => {
                if (p[0]){
                    console.log(p[0])
                    return res.status(409).json({
                        error: 'Name must be unique'
                    })
                } else {
                    const person = new Person ({
                        name: body.name,
                        number: body.number,
                        // id: randomId()
                    })
                
                    person.save().then(savedPerson => {
                        // phonebook = phonebook.concat(savedPerson)
                        res.json(savedPerson)
                    })
                    .catch(error => next(error))
                
                }
            })
            .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (req,res,next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
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
    if (error.name === 'CastError') {
        return res.status(400).send({error: 'Malformatted id'})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})