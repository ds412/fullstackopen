import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addName = (event) => {
        event.preventDefault()
        if (!persons.some(person => person.name === newName)) {
            const nameObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1),
            }
            setPersons(persons.concat(nameObject))
        }
        else {
            alert(`${newName} is already added to the phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }

    const filteredNames = () => {
        return persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter filterValue={newFilter} onFilterChange={handleFilterChange}></Filter>
            <h2>Add a new Person</h2>
            <PersonForm
                addNameFn={addName} nameValue={newName} numberValue={newNumber}
                onNameChange={handleNameChange} onPhoneChange={handlePhoneChange}>
            </PersonForm>
            <h2>Numbers</h2>
            <Persons persons={filteredNames()}></Persons>
        </div>
    )
}

export default App
