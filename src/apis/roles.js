import axios from '@src/utils/axios';

export async function getAll(query) {
  return axios.get('/roles', query);
}
export async function create(data) {
  return axios.post('/roles', data);
}
export async function update(data) {
  return axios.put('/roles', data);
}
export async function del(id) {
  return axios.delete(`/roles/${id}`);
}
export async function getOneResources(id) {
  return axios.get(`/roles/${id}/resources`);
}
export async function getOneUsers(id) {
  return axios.get(`/roles/${id}/users`);
}
export async function getOneNotUsers(roleId) {
  return axios.get(`/users/notAllocatedUsers/${roleId}`);
}
export async function allocateResource(id, resIds) {
  return axios.post(`/roles/${id}/resources`, resIds);
}
export async function reallocateUsers(id, users) {
  return update({
    id,
    users,
  });
}
