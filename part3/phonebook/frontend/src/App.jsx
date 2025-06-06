import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(newPersons => { setPersons(newPersons) })
    }, [])

    const addClickHandler = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)

        if (!existingPerson) {
            addPerson()
        }
        else if (existingPerson.number !== newNumber) {
            updatePerson(existingPerson)
        }
        else {
            alert(`${newName} is already added to the phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }

    const addPerson = () => {
        const personObject = {
            name: newName,
            number: newNumber,
        }

        personService
            .create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setMessage(`Added ${newName}`)
                setTimeout(() => { setMessage(null) }, 5000)
            })
    }

    const updatePerson = (person) => {
        let msg = `${person.name} is already in the phonebook, replace the old number with a new one?`
        if (confirm(msg)) {
            const changedPerson = { ...person, number: newNumber }

            personService
                .update(person.id, changedPerson)
                .then(updatedPerson => {
                    setPersons(persons.map(p => (p.id === updatedPerson.id) ? updatedPerson : p))
                    setMessage(`Updated the number for ${updatedPerson}`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })
                .catch(error => {
                    setMessage(`Information for ${person.name} was already deleted from server`)
                    setTimeout(() => { setMessage(null) }, 5000)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    const removePerson = (person) => {
        if (confirm(`Do you want to delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(removed => {
                    setPersons(persons.filter(p => p.id != removed.id))
                })
                .catch(error => {
                    setMessage(`Information for ${person.name} was already deleted from server`)
                    setTimeout(() => { setMessage(null) }, 5000)
                    setPersons(persons.filter(p => p.id !== person.id))
                })

        }
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
            <Notification message={message}></Notification>
            <Filter filterValue={newFilter} onFilterChange={handleFilterChange}></Filter>
            <h2>Add a new Person</h2>
            <PersonForm
                addNameFn={addClickHandler} nameValue={newName} numberValue={newNumber}
                onNameChange={handleNameChange} onPhoneChange={handlePhoneChange}>
            </PersonForm>
            <h2>Numbers</h2>
            <Persons
                persons={filteredNames()}
                removeHandler={removePerson}>
            </Persons>
        </div>
    )
}

export default App
