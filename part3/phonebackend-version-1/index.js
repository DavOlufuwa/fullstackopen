const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())


morgan.token('body', res => JSON.stringify(res.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const generateNewId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({ error: 'content missing'})
  }

  if(persons.some(person => person.name === body.name)){
    return res.status(400).json({ error: 'name already exists in the phonebook'})
  }

  const person = {
    id: generateNewId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)

 
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
