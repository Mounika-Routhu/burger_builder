import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://routhu-myburger.firebaseio.com/'
});

export default instance;