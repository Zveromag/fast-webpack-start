import axios from 'axios';

const responseInterceptor = response => {
  return response.data;
};

const errorInterceptor = error => {
  console.warn(`%c Error: %c ${error.message}`, 'background: #dd514c; color: #fff; font-weight: bold; border-radius: 4px;', '');
  return Promise.reject(error);
};

export const httpRequest = axios.create({
  baseURL: '/api',
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
});
httpRequest.interceptors.response.use(responseInterceptor, errorInterceptor);

// Tests
export const testClass = {
  testPost(form) {
    const data = new FormData(form);
    return httpRequest.post('/className/classMethod', data);
  },
  testGet(data) {
    return httpRequest.get('/className/classMethod', {
      params: data,
      //responseType: 'blob'
    });
  }
};
