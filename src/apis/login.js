import axios from '@utils/axios';
import md5 from 'md5';

// eslint-disable-next-line import/prefer-default-export
export function login(username, password) {
  // 加密密码
  const passwordHash = md5(password);
  return axios.post('auth/login', { username, password: passwordHash });
}
export function getNewToken(refreshToken) {
  return axios.post('auth/refresh', { refreshToken });
}
export function getSelfInfo() {
  return axios.get('auth/self/resources');
}
