import { useState } from 'react'
import SearchBox from './components/SearchBox'
import PersonForm from './components/PersonForm'
import PersonsDisplay from './components/PersonsDisplay'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')



  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name : newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
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
        <PersonsDisplay persons={personsToShow}></PersonsDisplay>
    </div>
  )
}

export default App