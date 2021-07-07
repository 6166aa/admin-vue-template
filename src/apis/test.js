import axios from '@utils/axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';

// eslint-disable-next-line import/prefer-default-export
export function test1() {
  const testData = {
    id: 55,
    userInfo: {
      name: '张三',
      age: 16,
    },
  };
  axios.post('auth/test', qs.stringify(testData));
}
export function test2() {
  const testData = {
    id: 55,
    userInfo: {
      name: '张三',
      age: 16,
    },
  };
  axios.post('auth/test', testData);
}
