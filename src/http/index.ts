import router from '@/router'
import axios from 'axios'

// export const ip = "http://123.60.133.32:8098/blog"
export const ip = "http://127.0.0.1:5000/blog"

const $http = axios.create({
  baseURL: ip
})

$http.interceptors.request.use((require) => {
  if (localStorage.getItem('token')) {
    require.headers.token = localStorage.getItem('token')
  }
  return require
}, (error) => {
  console.log(error)
})

$http.interceptors.response.use((response) => {
  if (response.status == 401) {
    // token失效
    router.push('/login')
  } else if (response.status == 403) {
    // token用户不对
    router.push(`/${response.data}`)
  }
  return response
}, (error) => {
  console.log(error)
})

export default $http