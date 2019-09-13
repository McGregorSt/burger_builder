import axios from 'axios'

const inst = axios.create({
    baseURL: 'https://react-burger-builder-mcgs.firebaseio.com/'
})

export default inst