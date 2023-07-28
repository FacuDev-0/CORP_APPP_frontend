import axios from 'axios'

const clienteURL = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

export default clienteURL