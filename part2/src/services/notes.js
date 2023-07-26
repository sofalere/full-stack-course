import axios from 'axios'
const baseURL = '/api/notes';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = async (noteObject) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseURL, noteObject, config);
  return response.data;
};

const update = (changedNote, id ) => {
  const request = axios.put(baseURL + '/' + id, changedNote);
  return request.then(response => response.data);
};

export default { getAll, create, update, setToken }
