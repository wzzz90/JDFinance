import axios from 'axios';
import router from '../router'
import store from '../store';

import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';

axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  config => {
    Indicator.open();
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

axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response.data;
  },
  error => {
    Indicator.close();

    if (error.response.status === 401) {
      router.push('/login');
      store.dispatch('changeLoginAction', false)
    } else {
      Toast({
        message: '网络错误',
        duration: 2000
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
