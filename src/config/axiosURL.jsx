import axios from 'axios'

const clienteURL = axios.create({
    baseURL: 'http://localhost:4000/inisa'
})

export default clienteURL