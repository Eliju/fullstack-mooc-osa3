const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
//mongoose.set('runValidators', true)

// get an environment variable
const un = process.env['MONGODB_USER']
const pw = process.env['MONGODB_USER_PW']
const db = process.env['MONGODB_DATABASE']
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
    console.log('Connected to MongoDB:', result.connections[0].host)
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.plugin(uniqueValidator)

//const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)