import axios from '@src/utils/axios';

export async function getAll(query) {
  return axios.get('/resources', query);
}
export async function getAllMenu() {
  return getAll({ q: 0, q_field: 'type' });
}
export async function create(data) {
  return axios.post('/resources', data);
}
export async function update(data) {
  return axios.put('/resources', data);
}
export async function del(id) {
  return axios.delete(`/resources/${id}`);
}
export async function getAllTree() {
  return axios.get('/resources/tree');
}
