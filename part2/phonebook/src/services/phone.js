import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewEntry = (newNameObject) => {
  const request = axios.post(baseUrl, newNameObject)
  return request.then(response => response.data)
}

const updateNumber = (id, updatedProfile) => {
  const specificUrl = `${baseUrl}/${id}`
  const request = axios.put(specificUrl, updatedProfile)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
  const specificUrl = `${baseUrl}/${id}`
  const request = axios.delete(specificUrl)
  return request.then(response => response.data)
}

export default { getAll, createNewEntry, deleteEntry, updateNumber }