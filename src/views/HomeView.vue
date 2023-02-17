<template>
  <div class="common-layout">
    <img src="../assets/title.gif" alt="" class="header-img" style="width:100%;padding-top:20px">
    <div class='container'>

      <HeaderComp></HeaderComp>

      <div class="user-body">
        <div class='aside-block' style="top:40px">
          <div class='aside-box'>
            <div class="aside-box-title"> 我的专栏 </div>
            <div class="aside-box-body">
              <div class="aside-box-body-content">
                <ul>
                  <li v-for="item in ['python', 'vue', 'shell', '其他']" :key="item">
                    <a href="http://" target="_blank" rel="noopener noreferrer" class="aside-box-body-a">
                      <div class="special-colum-bar"></div>
                      {{ item }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          <div class='aside-box'>
            <div class="aside-box-title"> 我的专栏 </div>
            <div class="aside-box-body">
              <div class="aside-box-body-content">
                <ul>
                  <li v-for="item in ['python', 'vue', 'shell', '其他']" :key="item">
                    <a href="http://" target="_blank" rel="noopener noreferrer" class="aside-box-body-a">
                      <div class="special-colum-bar"></div>
                      {{ item }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div class="navList-box">
          <!-- article列表 -->
          <ul>
            <li v-for="item in data.articleList" :key='item.id' style="list-style-type:none">
              <el-divider />
              <SimpleInfoComp :title="item.title" :context="item.context" :ctime="formatDate(item.ctime)" :type="item.type"></SimpleInfoComp>
            </li>
          </ul>
          <p v-if="loading" style="text-align: center">Loading...</p>
          <p v-if="noMore" style="text-align: center">No more</p>
        </div>
      </div>
      <el-footer></el-footer>
    </div>
  </div>

</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { formatDate } from '../utils/common.js'
import HeaderComp from '../components/HeaderComp.vue'
import SimpleInfoComp from '../components/SimpleInfoComp.vue'

export default {
  name: 'HomeView',
  components: { HeaderComp, SimpleInfoComp },

  setup() {
    let data = reactive({
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
        },
        {
          id: 6,
          title: '这个是title',
          context:
            '先看一下成果图：图片给大家，从某一篇帖子找的。需要使用的的库：matplotlib.pyplot       绘图展示jeiba		           分词wordcloud.WordCloud	  	     		 绘制词云numpy			           制作背景图PIL.Image		          	制作背景图不知道说什么，说明全在代码里：from matplotlib import pyplot as pltimport jieba',
          type: 'vue',
          ctime: new Date()
        },
        {
          id: 6,
          title: '这个是title',
          context:
            '先看一下成果图：图片给大家，从某一篇帖子找的。需要使用的的库：matplotlib.pyplot       绘图展示jeiba		           分词wordcloud.WordCloud	  	     		 绘制词云numpy			           制作背景图PIL.Image		          	制作背景图不知道说什么，说明全在代码里：from matplotlib import pyplot as pltimport jieba',
          type: 'vue',
          ctime: new Date()
        },
        {
          id: 6,
          title: '这个是title',
          context:
            '先看一下成果图：图片给大家，从某一篇帖子找的。需要使用的的库：matplotlib.pyplot       绘图展示jeiba		           分词wordcloud.WordCloud	  	     		 绘制词云numpy			           制作背景图PIL.Image		          	制作背景图不知道说什么，说明全在代码里：from matplotlib import pyplot as pltimport jieba',
          type: 'vue',
          ctime: new Date()
        }
      ]
    })
    const noMore = ref(false)
    const loading = ref(false)

    //获取当前可视范围的高度
    let getClientHeight = () => {
      var clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
      return clientHeight
    }
    //获取文档完整的高度
    let getScrollHeight = () => {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    }
    //获取当前滚动条的位置
    let getScrollTop = () => {
      var scrollTop = 0
      //window.pageYOffset = document.documentElement.scrollTop
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    }
    let windowScroll = () => {
      //获取三个值
      var scrollTop = getScrollTop()
      var clientHeight = getClientHeight()
      var scrollHeight = getScrollHeight()
      console.log(scrollTop, clientHeight, scrollHeight)
      console.log(scrollTop + clientHeight == scrollHeight)
      //如果满足公式则，确实到底了
      if (scrollTop + clientHeight == scrollHeight) {
        //发送异步请求请求数据，同时携带offset并自增offset
        //noMore是自定义变量，如果是最后一批数据则以后都不加载
        console.log('到底了')
        if (!noMore.value) {
          console.log('加载数据')
          loading.value = true
          setTimeout(() => {
            let tmp = data.articleList
            data.articleList.push(...tmp)
          }, 2000)
          loading.value = false
        }
        if (data.articleList.length > 20) {
          noMore.value = true
        }
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', windowScroll, true) //监听页面滚动
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', windowScroll) //销毁滚动事件
    })

    return { data, loading, noMore, formatDate }
  }
}
</script>

<style scoped>
.container {
  /* width: 70%;
  margin: auto auto;
  padding-top: 60px;
  height: 100%; */
}
.navList-box {
  background-color: white;
  border-radius: 4px;
  margin-left: 6px;
  flex: 1;
  /* width: 300px; */
}

.user-body {
  width: 1320px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  min-height: 700px;
  padding-bottom: 32px;
  margin: 10px auto 0;
}
.aside-block {
  width: 280px;
  position: sticky;
  /* top: 40px; */
  align-items: start;
}
.aside-box {
  background-color: white;
  display: block;
  border-radius: 5px;
  margin-right: 6px;
  margin-bottom: 6px;
}
.aside-box-title {
  height: 48px;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: 1px solid #e8e8ed;
}
.aside-box-body {
  padding: 16px;
}
.aside-box-body-content ul {
  border-left: 1px dashed #ccccd8;
  padding: 0;
  margin: 0;
  list-style-type: none;
  list-style: none;
  box-sizing: border-box;
  display: block;
}
.aside-box-body-a {
  text-decoration: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #555666;
  font-size: 16px;
  line-height: 30px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.aside-box-body-a:hover {
  color: red;
}
.special-colum-bar {
  width: 12px;
  height: 1px;
  border-bottom: 1px dashed #ccccd8;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-right: 8px;
}
</style>