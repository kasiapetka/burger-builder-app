import axios from 'axios'

const instance = axios.create({
    baseURL:'https://burger-builder-react-95245.firebaseio.com/'
});

export default instance;