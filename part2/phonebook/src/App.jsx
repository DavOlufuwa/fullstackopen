import { useEffect, useMemo, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

import phoneService from './services/phone'



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      .then(returnedInfo => setPersons(persons.map(person => person.id !== returnedInfo.id ? person : returnedInfo)))
      .catch(err => console.log(err))

      alert(`${newName} updated successfully`)
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
    
    alert("New Contact Added")
    
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
    }

    alert("Contact deleted successfully")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewContact={addNewContact} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteContact={deleteContact}/>
    </div>
  )
}



export default App
