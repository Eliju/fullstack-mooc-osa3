const mongoose = require('mongoose')

// get an environment variable
const un = process.env['MONGODB_USER'];
const pw = process.env['MONGODB_USER_PW'];
const db = process.env['MONGODB_DATABASE'];
let url = process.env['MONGODB_CONN_STRING']
url = url.replace('${un}',un).replace('${pw}', pw).replace('${db}',db)

mongoose.connect(url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)