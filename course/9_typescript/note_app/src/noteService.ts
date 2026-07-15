import axios from 'axios'
import type { Note, NewNote } from './types'

const baseUrl = 'http://localhost:3001/notes'

// Axios response should really be type-checked using parsing code
const getAll = () => {
    return axios
        .get<Note[]>(baseUrl)
        .then(response => response.data)
}

// Axios response should really be type-checked using parsing code
const create = (object: NewNote) => {
    return axios
        .post<Note>(baseUrl, object)
        .then(response => response.data)
}

export default { getAll, create }
