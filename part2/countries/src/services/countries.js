import axios from 'axios'



const getAll = () => {
    const response = axios.get('https://restcountries.com/v3.1/all')
    return response.then(response => response.data)
}

export default { getAll }