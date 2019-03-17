import axios from 'axios';

axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default axios;
