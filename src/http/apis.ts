import $http from './index'
import { ref, reactive } from 'vue'
import { pa } from 'element-plus/es/locale'


// 登录
export const login = async (username: string, password: string) => {
  let { data } = await $http.post('/login', { username: username, password: password })
  return data
}

// 注册 
export const register = async (registerForm: { nickname: string, username: string, password: string, email: string }) => {
  let { data } = await $http.post('/register', registerForm)
  return data
}

// // 判断是否登陆
// export const if_login = async () => {
//   let { data } = await $http.get('/loginstatus')
//   return data
// }

// 获取用户信息
export const get_author = async (username: string) => {
  let { data } = await $http.get(`/${username}/author`)
  return data
}

// 修改用户信息
export const change_author = async (username: string, nickname: string, production: string, url: string) => {
  let { data } = await $http({
    method: "PUT",
    url: `/${username}/author`,
    data: { nickname: nickname, production: production, url: url }
  })
  return data
}

// 创建文章
export const create_article = async (article: { author: string, title: string, context: string, type: string }) => {
  let { data } = await $http({
    method: "POST",
    url: `/${article.author}/article`,
    data: { article: article }
  })
  // let { data } = await $http.post('/create_article', { article: article })
  return data
}

// 获取文章list
export const get_articleList = async (username: string, page: Number = 1, size: Number = 4, type: string = '') => {
  let { data } = await $http({
    method: "GET",
    url: `/${username}/articles`,
    params: { page: page, size: size, type: type }
  })
  // let { data } = await $http.post('/get_articleList', { username: username, size: size, page: page })
  return data
}

// 获取文章详细  (show & edit))
export const get_article = async (username: string, aid: number | string) => {
  let { data } = await $http({
    method: "GET",
    url: `/${username}/article/${aid}`,
  })
  return data
}

// 删除文章
export const delete_article = async (username: string, aid: number | string) => {
  let { data } = await $http({
    method: "DELETE",
    url: `/${username}/article/${aid}`,
  })
  return data
}


// 获取草稿
export const get_draft = async (username: string) => {
  let { data } = await $http({
    method: "GET",
    url: `/${username}/draft`,
  })
  // let { data } = await $http.post('/get_draft', { username: username })
  return data
}

// 保存草稿
export const save_draft = async (draft: { author: string, title: string, context: string, tyoe: string }) => {
  let { data } = await $http({
    method: "PUT",
    url: `/${draft.author}/draft`,
    data: { draft: draft }
  })
  // let { data } = await $http.post('/save_draft', { draft: draft })
  return data
}

// 添加用户专栏
export const add_type = async (author: string, name: string, production: string) => {
  let { data } = await $http.post(`/${author}/type`, { name: name, production: production })
  return data
}


// 获取推荐列表
export const get_recommend_list = async () => {
  let { data } = await $http({
    method: 'GET',
    url: '/recommend',
  })
  return data
}



