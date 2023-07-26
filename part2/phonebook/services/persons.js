import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then(response => {
    return response.data;
  }).catch(error => Promise.reject(new Error(error)));
}

const remove = (id) => {
  return axios.delete(baseURL + '/' + id);
}
export default { getAll, create, remove }