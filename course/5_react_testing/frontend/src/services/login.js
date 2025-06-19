// component responsible for logging in to server
import axios from 'axios'
const baseUrl = '/api/login'

// makes HTTP POST request to /api/login with credentials
const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }
