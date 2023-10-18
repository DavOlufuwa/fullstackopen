import { useEffect, useMemo, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import './index.css'
import phoneService from './services/phone'
import Notification from "./components/Notification"



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(false)

  // fetching data from server
  useEffect(() => {
    phoneService.
    getAllPersons()
    .then(personsInfo => {
      setPersons(personsInfo)}
    )
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  // Filtering a Contact
  const filteredPersons = useMemo(() => persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())), [persons, filter])

  // Adding a New Contact
  const addNewContact = (e) => {
    e.preventDefault()

    const existingUser = persons.find(person => person.name === newName && person.number !== newNumber)

    // checking if persons has the newName already
    if(existingUser) {
    const validate = confirm(`${newName} already exists in the phonebook, replace the old number with a new one?`)

    if(validate) {
      phoneService
      .updatePerson(existingUser.id, {...existingUser, number: newNumber})
      .then(returnedInfo => setPersons(persons.map(person => person.id !==    returnedInfo.id ? person : returnedInfo)))
      .catch(err => {
        setMsg(`${newName} has been removed from the server`)
        setError(true)
        setTimeout(() => {
          setMsg(null)
          setError(false)
        }, 3000)
        console.log(err)
        setPersons()
      })

      setMsg(
        `${newName} has been updated successfully`
      )
      setTimeout(() => {
        setMsg(null)
      }, 3000)
    }
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    phoneService
    .addNewPerson(newPerson)
    .then(
      returnedInfo => setPersons([...persons, {...returnedInfo}])
    )
    .catch(err => console.log(err))
    
    setMsg(
      `${newName} has been added successfully`
    )
    setTimeout(() => {
      setMsg(null)
    }, 3000)
    
    setNewName('')
    setNewNumber('')
  }

  // Deleting a Contact
  const deleteContact = (id) => {
    
    const personToDelete = persons.find(person => person.id === id)
   
    const validate = confirm(`Are you sure you want to delete ${personToDelete.name}`)

    if(validate){
      phoneService
      .deletePerson(personToDelete.id)
      .then(personsInfo => setPersons(personsInfo))
      .catch(error => {
        setMsg(
          `'${personsInfo}' was already removed from server`
        )
        setError(true)
        setTimeout(() => {
          setMsg(null)
          setError(false)
        }, 5000)
        console.log(error)
      })

      setMsg(
        `'${personToDelete.name}' was deleted successfully`
      )
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Notification message={msg} error={error}/>
      </div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewContact={addNewContact} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteContact={deleteContact}/>
    </div>
  )
}



export default App
