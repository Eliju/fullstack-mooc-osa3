const e = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

morgan.token('body', function getBody(req) {
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    } else {
        return ' '
    }
    
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook = [
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
]

app.get('/', (req,res) => {
    let url = req.hostname
    if (url === 'localhost') {
        url = url.concat(':3001')
    }
    res.send(`Phonebook available in url http://${url}/api/persons`)
})

app.get('/api/persons', (req,res) => {
    res.json(phonebook)
})

app.get('/info', (req,res) => {
    const size = phonebook.length
    const curr_date = new Date()

    res.send(`Phonebook has info for ${size} people <br/><br/>${curr_date}`)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = phonebook.find((p => p.id === id))

    if (!person) {
        res.status(404).end()
    } else {
        res.json(person)
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = phonebook.find((p => p.id === id))

    phonebook = phonebook.filter (p => p.id !== id)

    if (person){
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

const randomId = () => {
    let maxValue = 100000
    let Id = Math.floor(Math.random() * maxValue) + 1;
    while (phonebook.find(p => p.id === Id)) {
        if (maxValue <= phonebook.length) {
            maxValue *= 10
        }
        Id = Math.floor(Math.random() * maxValue) + 1;
    }
    return Id
}

app.post('/api/persons', (req,res) => {
    const body = req.body

    if (!body.name){
        return res.status(400).json({
            error: 'Name is a mandatory field'
        })
    } else if (!body.number){
        return res.status(400).json({
            error: 'Number is a mandatory field'
        })
    } else if (phonebook.find(p => p.name === body.name)){
        return res.status(409).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: randomId()
    }

    phonebook = phonebook.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})