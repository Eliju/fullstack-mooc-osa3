const express = require('express')

const app = express()
app.use(express.json())

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
    res.send('Phonebook available in url https:/localhost:3001/api/persons')
})

app.get('/api/persons', (req,res) => {
    res.json(phonebook)
})

app.get('/info', (req,res) => {
    const size = phonebook.length
    const curr_date = new Date()

    res.send(`Phonebook has info for ${size} people <br/><br/>${curr_date}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})