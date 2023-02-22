import $http from './index'
import { ip } from './index'
import { ref, reactive } from 'vue'



export const create_article = async (article: Object) => {
  let { data } = await $http.post(ip + '/create_article', { article: article })
  return data
}

// 获取一页文章list
export const get_article_list = (author: string, page: number = 1, size: number = 5) => {
  // test
  console.log(author, page, size)
  let result = {
    articleList: [
      {
        id: 1,
        title: '这个是title',
        context:
          '对于京东图书的爬取https://book.jd.com/booksort.html步骤：访问主页地址，获取大分类列表循环大分类，获取小分类列表循环小分类，分别访问url，获取图书列表获取所需信息，构建next_page，生成一个新的请求步骤很简单，中间有一些需要注意的地方：① element和获取的请求有些许不同，如果不成功，多半是这边的问题② url记得加上 https:③ 再循环小分类列表的时候，需要共享item[“big_cate”]，所以在构造新请求的时候，记得使用deep',
        type: 'python',
        ctime: new Date()
      },
      {
        id: 2,
        title: '这个是title',
        context:
          '先看一下成果图：图片给大家，从某一篇帖子找的。需要使用的的库：matplotlib.pyplot       绘图展示jeiba		           分词wordcloud.WordCloud	  	     		 绘制词云numpy			           制作背景图PIL.Image		          	制作背景图不知道说什么，说明全在代码里：from matplotlib import pyplot as pltimport jieba',
        type: 'vue',
        ctime: new Date()
      },
      {
        id: 3,
        title: '这个是title',
        context: '文本内容',
        type: 'python',
        ctime: new Date()
      },
      {
        id: 4,
        title: '这个是title',
        context: '文本内容',
        type: 'python',
        ctime: new Date()
      },
      {
        id: 5,
        title: '这个是title',
        context:
          '先看一下成果图：图片给大家，从某一篇帖子找的。需要使用的的库：matplotlib.pyplot       绘图展示jeiba		           分词wordcloud.WordCloud	  	     		 绘制词云numpy			           制作背景图PIL.Image		          	制作背景图不知道说什么，说明全在代码里：from matplotlib import pyplot as pltimport jieba',
        type: 'vue',
        ctime: new Date()
      }
    ],
    hasnext: true
  }
  if (page > 3) {
    result.hasnext = false
  }
  console.log(result)
  return result
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
  console.log(data)
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


