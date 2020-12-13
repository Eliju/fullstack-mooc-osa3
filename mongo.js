const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('MongoDB password needs to be given')
    process.exit(1)
}

const pw = process.argv[2]

const urlMongoDB = `mongodb+srv://phonebook-mongo-user:${pw}@phonebookcluster.tw9av.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(urlMongoDB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
    })
/*  useNewUrlParser - The underlying MongoDB driver has deprecated their current connection string parser. 
    Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to 
    the old parser if they find a bug in the new parser. You should set useNewUrlParser: true 
    unless that prevents you from connecting. Note that if you specify useNewUrlParser: true, 
    you must specify a port in your connection string, like 
    mongodb://localhost:27017/dbname. The new url parser does not support connection strings 
    that do not have a port, like mongodb://localhost/dbname */
/*  useUnifiedTopology- False by default. Set to true to opt in to using the MongoDB driver's 
    new connection management engine. You should set this option to true, except for the unlikely 
    case that it prevents you from maintaining a stable connection. */
/*  useFindAndModify - True by default. Set to false to make findOneAndUpdate() and findOneAndRemove() 
    use native findOneAndUpdate() rather than findAndModify(). */
/*  useCreateIndex - False by default. Set to true to make Mongoose's default index build use 
    createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver. */

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3){
        Person.find({}).then(result =>{
            console.log('Phonebook:')
            result.forEach(p => {
                console.log(`${p.name} ${p.number}`)
            })
            mongoose.connection.close()
        })
    } 

    if (process.argv.length === 5){
        const name = process.argv[3]
        const number = process.argv[4]
        const person = new Person({
            name: name,
            number: number
        })
    
        person.save().then(res => {
            console.log(`Added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        }) 
    }

    /* const person = new Person({
        name: 'Alan Turing',
        number: '2306-1912-0706-1954'
    })

    person.save().then(res => {
        console.log('Person saved!')
        mongoose.connection.close()
    }) */