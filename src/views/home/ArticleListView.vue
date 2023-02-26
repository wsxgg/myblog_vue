<template>
  <div class="article-list-box">
    <img src="../../assets/title.gif" alt="" class="header-img" style="width:100%;padding-top:20px">
    <div class='container'>

      <HeaderComp :author="author"></HeaderComp>

      <div class="user-body">
        <LeftAsideComp></LeftAsideComp>

        <div class="navList-box">
          <!-- article列表 -->
          <ul>
            <li v-for="item in meta.articleList" :key='item.id' style="list-style-type:none">
              <el-divider />
              <a :href="`/${item.author}/article/${item.id}`" target="_blank" rel="noopener noreferrer" style="text-decoration: none">
                <SimpleInfoComp :title="item.title" :context="item.context" :ctime="formatDate(item.ctime)" :type="item.type"></SimpleInfoComp>
              </a>

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
import { ip } from '@/http/index'
import { formatDate } from '@/utils/common.js'
import HeaderComp from '@/components/HeaderComp.vue'
import SimpleInfoComp from '@/components/SimpleInfoComp.vue'
import LeftAsideComp from '@/components/LeftAsideComp.vue'
import { get_articleList } from '@/http/apis'
import { ElMessage } from 'element-plus'
import router from '@/router/index'

export default {
  name: 'HomeView',
  components: { HeaderComp, SimpleInfoComp, LeftAsideComp },
  props: ['author'],

  setup(props) {
    let author = props.author
    let meta = reactive({
      articleList: [],
      page: 1,
      size: 5
    })
    const noMore = ref(false)
    const loading = ref(false)

    // 获取一页数据
    const get_more = () => {
      get_articleList(props.author, meta.page, meta.size).then(res => {
        if (res.status != 200) {
          // TODO 用户不存在， 暂时这么写
          ElMessage({
            message: res.msg,
            type: 'error'
          })
          // 转到个人主页
          router.push('/')
        } else {
          noMore.value = !res.hasnext
          meta.articleList.push(...res.items)
        }
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
      //如果满足公式则，确实到底了
      if (scrollTop + clientHeight == scrollHeight) {
        //发送异步请求请求数据，同时携带offset并自增offset
        //noMore是自定义变量，如果是最后一批数据则以后都不加载
        if (!noMore.value) {
          console.log('加载数据')
          loading.value = true
          meta.page += 1
          get_more()

          // let tmp = setTimeout(() => {
          //   let tmp = meta.articleList
          //   meta.articleList.push(...tmp)
          //   loading.value = false
          //   if (meta.articleList.length > 20) {
          //     noMore.value = true
          //   }
          // }, 2000)
        }
      }
    }
    onMounted(() => {
      // 获取一页数据
      get_more()

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