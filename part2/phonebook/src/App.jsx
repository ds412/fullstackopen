import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
             .then(response => { setPersons(response.data) })
    }, [])

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
