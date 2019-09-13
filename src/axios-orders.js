import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-mcgs.firebaseio.com/'
})

export default instance