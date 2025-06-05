import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

// This module provides functions to interact with the server

// use HTTP GET to return the data array at the url, returns the HTTP response data
const getAll = () => {
    //axios.get returns a promise (async operation), which is handled by .then
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// use HTTP POST to add a new object to the data array, returns the HTTP response data
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// use HTTP PUT to replace object at url/id by new object, returns the HTTP response data
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }
