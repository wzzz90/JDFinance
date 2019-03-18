import axios from 'axios';
import router from '../router'
axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      // Authorization是JWT的认证头部信息
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// /src/main.js
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      router.push('/login');
    } else {
      Vue.prototype.$message.showMessage({
        type: 'error',
        content: '系统出现错误'
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
