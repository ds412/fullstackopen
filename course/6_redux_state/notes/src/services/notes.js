import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

// get notes from server
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

// send a new note to the server
const createNew = async (content) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew, }
