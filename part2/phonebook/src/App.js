import { useState, useEffect} from 'react'
import contactService from './services/contacts'
import SearchBox from './components/SearchBox'
import PersonForm from './components/PersonForm'
import PersonsDisplay from './components/PersonsDisplay'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => setPersons(contacts))
  }, [])



  const addPerson = (event) => {
    event.preventDefault()
    const personToAdd = persons.find(p => p.name === newName)
    
    if (personToAdd){
      const updateNumber = window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)
      if (updateNumber){
        const updatedPerson = { ...personToAdd, number: newNumber}
        contactService
          .update(updatedPerson)
          .then(addedPerson => {
            const newPersons = persons.map(person => person.id !== addedPerson.id ? person : addedPerson)
            setPersons(newPersons)
          })
      }
      
    }else{
      contactService
        .create({name : newName, number: newNumber})
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToRemove.name} from phonebook?`)){
      contactService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const handleSearchInput = (event) => setNewSearch(event.target.value)
  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const personsToShow = !newSearch ? persons : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <SearchBox handleSearchInput={handleSearchInput} value={newSearch}></SearchBox>

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson}
                  handleNameInput={handleNameInput}
                  newName={newName}
                  handleNumberInput={handleNumberInput}
                  newNumber={newNumber}></PersonForm>

      <h2>Numbers</h2>
        <PersonsDisplay persons={personsToShow} personRemover={removePerson}></PersonsDisplay>
    </div>
  )
}

export default App