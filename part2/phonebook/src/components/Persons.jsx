import React from 'react'

const Persons = ({filteredPersons, deleteContact}) => {
  return (
    <div>
    {filteredPersons.map(
      person => 
        <div key={person.id}>
          <p >{person.name} {person.number} 
          <button onClick={() => deleteContact(person.id)}>Delete</button></p>
        </div> 
      )}
  </div>
  )
}

export default Persons