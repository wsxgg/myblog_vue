<template>
  <Header></Header>
  <div class="article-list-box">
    <img src="../../assets/title.gif" alt="" class="header-img" style="width:100%;padding-top:20px">
    <div class='container'>

      <HeaderComp :author="author"></HeaderComp>

      <div class="user-body">
        <LeftAsideComp :author='author'></LeftAsideComp>
        <div class="navList-box">
          <!-- article列表 -->
          <ul style="padding-right: 40px">
            <li v-for="item in meta.articleList" :key='item.id' style="list-style-type:none">
              <el-divider />
              <a :href="`/${item.author}/article/${item.id}`" target="_blank" rel="noopener noreferrer" style="text-decoration: none">
                <SimpleInfoComp :title="item.title" :context="item.context" :ctime="formatDate(item.ctime)" :type="item.type"></SimpleInfoComp>
              </a>

            </li>
            <div v-loading="loading" element-loading-text='Loading...'></div>
            <el-divider v-if="noMore" border-style="dashed"> <span style="color: rgb(21, 80, 168)"> no more </span> </el-divider>

          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ip } from '@/http/index'
import { formatDate } from '@/utils/common.js'
import Header from '@/components/Header.vue'
import HeaderComp from '@/components/HeaderComp.vue'
import SimpleInfoComp from '@/components/SimpleInfoComp.vue'
import LeftAsideComp from '@/components/LeftAsideComp.vue'
import { get_articleList } from '@/http/apis'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router/index'

export default {
  name: 'ArticleListView',
  components: { HeaderComp, SimpleInfoComp, LeftAsideComp, Header },
  props: ['author'],

  setup(props) {
    let author = props.author
    let type = router.currentRoute.value.query.type
    let meta = reactive({
      articleList: [],
      page: 1,
      size: 5
    })
    const noMore = ref(false)
    const loading = ref(true)

    // 获取一页数据
    const get_more = async (author, page, size, type) => {
      await get_articleList(author, page, size, type).then(res => {
        if (res.status != 200) {
          ElMessage({
            message: res.msg,
            type: 'error'
          })
          // 返回上一级页面
          router.go(-1)
        } else {
          noMore.value = !res.has_next
          meta.articleList.push(...res.items)
        }
        loading.value = false
      })
    }

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
      // console.log(scrollTop, clientHeight, scrollHeight)
      //如果满足公式则，确实到底了
      if (scrollTop + clientHeight == scrollHeight) {
        //发送异步请求请求数据，同时携带offset并自增offset
        //noMore是自定义变量，如果是最后一批数据则以后都不加载
        if (!noMore.value) {
          console.log('加载数据')
          loading.value = true
          meta.page += 1
          get_more()
        }
      }
    }
    onMounted(() => {
      // 获取一页数据
      get_more(props.author, meta.page, meta.size, type)

      // 监听页面滚动
      window.addEventListener('scroll', windowScroll, true) //监听页面滚动
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', windowScroll) //销毁滚动事件
    })

    return { ip, meta, loading, noMore, author, formatDate }
  }
}
</script>

<style scoped>
.article-list-box {
  background-image: url('@/assets/bg.gif');
}

.navList-box {
  background-color: white;
  border-radius: 4px;
  margin-left: 6px;
  flex: 1;
  width: 300px;
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
</style>