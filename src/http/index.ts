import axios from 'axios'

// export const ip = "http://114.117.188.116:7002"
export const ip = "http://127.0.0.1:5000/blog"

const $http = axios.create({
  baseURL: ip
})

$http.interceptors.request.use((require) => {
  return require
}, (error) => {
  console.log(error)
})

$http.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log(error)
})

export default $http