<template>
  <div class="common-layout">
    <el-container class='container'>
      <img src="../assets/title.gif" alt="" class="header-img" style="width:100%">
      <el-header>
        <HeaderComp></HeaderComp>
      </el-header>
      <el-container>
        <el-aside width="22%" class="left-list">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon>
                <document />
              </el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting />
              </el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container class="navList-box">
          <el-main>
            <!-- article列表 -->
            <div style="overflow: auto">
              <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="-10" style="list-style-type: none;">
                <li v-for="item in data.articleList" :key='item.id'>
                  <el-divider />
                  <SimpleInfoComp :title="item.title" :context="item.context" :ctime="formatDate(item.ctime)" :type="item.type"></SimpleInfoComp>
                </li>
              </ul>
              <p v-if="loading" style="text-align: center">Loading...</p>
              <p v-if="noMore" style="text-align: center">No more</p>

            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
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
    const loading = ref(false)
    const noMore = computed(() => data.articleList.length >= 20)
    const disabled = computed(() => loading.value || noMore.value)
    const load = () => {
      console.log('load')
      loading.value = true

      setTimeout(() => {
        data.articleList.push({
          id: 6,
          title: '这个是title',
          context:
            '先看一下成果图：图片给大家，从某一篇帖子找的。需要使用的的库：matplotlib.pyplot       绘图展示jeiba		           分词wordcloud.WordCloud	  	     		 绘制词云numpy			           制作背景图PIL.Image		          	制作背景图不知道说什么，说明全在代码里：from matplotlib import pyplot as pltimport jieba',
          type: 'vue',
          ctime: new Date()
        })
        loading.value = false
      }, 2000)
    }

    return { data, loading, noMore, disabled, formatDate, load }
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto auto;
  padding-top: 60px;
  height: 100%;
}
.navList-box {
  background-color: white;
}
</style>