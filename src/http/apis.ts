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

// 创建文章
export const create_article = async (article: Object) => {
  let { data } = await $http.post('/create_article', { article: article })
  return data
}

// 获取文章list
export const get_articleList = async (author: string, page: Number = 1, size: Number = 4) => {
  let { data } = await $http.post('/get_articleList', { author: author, size: size, page: page })
  return data
}

// 获取文章详细  (show & edit))
export const get_article = async (author: string, aid: number | string) => {
  let { data } = await $http.post('/get_article', { author: author, aid: aid })
  return data
}


// 获取草稿
export const get_draft = async (author: string) => {
  let { data } = await $http.post('/get_draft', { author: author })
  return data
}

// 保存草稿
export const save_draft = async (draft: Object) => {
  let { data } = await $http.post('/save_draft', { draft: draft })
  return data
}


// 获取专栏列表
export const get_column_list = async () => {
  let { data } = await $http.post('/columnlist', { "name": 'wsx' })
  return data.columnlist
}

// 获取推荐列表
export const get_recommend_list = () => {
  // let { data } = await $http({
  //   method: 'POST',
  //   url: '/api/get_recommeng_list',
  //   data: {}
  // })
  // console.log(data)
  // return data

  // test
  let recommendList = [
    {
      id: 1,
      title: '“刀哥”回应狂飙拍摄地拍照收费',
      author: 'wsx'
    },
    {
      id: 1,
      title: '“刀哥”回应狂飙拍摄地拍照收费',
      author: 'wsx'
    },
    {
      id: 1,
      title: '“刀哥”回应狂飙拍摄地拍照收费',
      author: 'wsx'
    },
    {
      id: 1,
      title: '“刀哥”回应狂飙拍摄地拍照收费',
      author: 'wsx'
    },
    {
      id: 1,
      title: '“刀哥”回应狂飙拍摄地拍照收费',
      author: 'wsx'
    }
  ]
  return recommendList
}



