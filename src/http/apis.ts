import $http from './index'
import { ip } from './index'
import { ref, reactive } from 'vue'



// 创建文章
export const create_article = async (article: Object) => {
  let { data } = await $http.post(ip + '/create_article', { article: article })
  return data
}

// 获取文章list
export const get_articleList = async (author: string, page: Number = 1, size: Number = 4) => {
  let { data } = await $http.post(ip + '/get_articleList', { author: author, size: size, page: page })
  return data
}


// 获取草稿
export const get_draft = async (author: string) => {
  let { data } = await $http.post(ip + '/get_draft', { author: author })
  return data
}

// 保存草稿
export const save_draft = async (draft: Object) => {
  let { data } = await $http.post(ip + '/save_draft', { draft: draft })
  return data
}


// 获取文章详细  (show & edit))
export const get_article = (author: string, aid: number | string) => {
  // let { data } = await $http({
  //   method: 'POST',
  //   url: '/api/get_article',
  //   data: {
  //     author: author,
  //     aid: aid
  //   }
  // })
  // console.log(data)
  // return data

  // test
  console.log(author, aid)
  let article = reactive({
    title: '如何实现词云图',
    context: `
\`\`\` python
a = 10
print('hello world')
\`\`\`
    `
  })
  return article
}

// 获取专栏列表
export const get_column_list = async () => {
  let { data } = await $http.post(ip + '/columnlist', { "name": 'wsx' })
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



