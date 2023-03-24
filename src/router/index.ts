import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store/index"
import { ElMessage, ListItem } from 'element-plus'
import { Back } from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'simblog--首页' },
    component: () => import('@/views/home/HomePageView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'simblog--登录' },
    component: () => import('@/views/home/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'simblog--注册' },
    component: () => import('@/views/home/RegisterView.vue'),
  },


  {
    path: '/:author',
    name: 'author-home',
    meta: { title: 'simblog-' },
    props: true,
    component: () => import('@/views/home/ArticleListView.vue'),
  },
  {
    path: '/:author/article/:aid',
    name: 'article-show',
    meta: { title: 'simblog-' },
    props: true,
    component: () => import('@/views/home/ArticleDetailView.vue')
  },
  {
    path: '/:author/article/edit/:aid',
    name: 'article-edit',
    meta: { requireOwner: true, title: 'simblog-编辑' },
    props: true,
    component: () => import('@/views/admin/ArticleEditView.vue')
  },
  {
    path: '/:author/article/create',
    name: 'article-create',
    meta: { requireOwner: true, title: 'simblog-新建' },
    props: true,
    component: () => import('@/views/admin/ArticleCreateView.vue')
  },

  {
    path: "/:pathMatch(.*)",
    name: '404',
    meta: { title: 'blog--404' },
    component: () => import('@/views/home/404View.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireOwner) {
    let userinfo = localStorage.getItem('userinfo')
    if (userinfo && JSON.parse(userinfo).username == to.params.author) {
      next()
    } else {
      ElMessage.error('权限拒绝')
      next('/')
    }
  } else {
    next()
  }
})


// // 游客的路由
// let vistorRouters = [
//   { path: '/:author', name: 'author-home', title: '我的博客--', props: true, component: 'ArticleListView' },
//   { path: '/:author/article/:aid', name: 'article-show', title: '我的博客--', props: true, component: 'ArticleDetailView' },
// ]
// // 用户的路由
// let userRouters = [
//   { path: '/:author', name: 'author-home', title: '我的博客--', props: true, component: 'ArticleListView' },
//   { path: '/:author/article/:aid', name: 'article-show', title: '我的博客', props: true, component: 'ArticleDetailView' },
//   { path: '/:author/article/edit/:aid', name: 'article-edit', title: '我的博客--修改--', props: true, component: 'ArticleEditView' },
//   { path: '/:author/article/create', name: 'article-show', title: '我的博客--新建', props: true, component: 'ArticleCreateView' },
// ]

// // 路由守卫
// let flag = true
// router.beforeEach((to, from, next) => {
//   console.log(store.state.nav)
//   if (flag && store.state.nav) {
//     // 动态生成路由
//     addRoutes()
//     next()
//   }
// })
// // 动态添加路由函数
// let addRoutes = () => {
//   // 1.获取当前登录用户
//   let user = null
//   // 2.根据登录用户添加路由
//   let addroutes
//   if (user == null) {
//     console.log('游客')
//     addroutes = vistorRouters
//   } else {
//     console.log('用户')
//     addroutes = userRouters
//   }
//   addroutes.forEach(item => {
//     routes.push({
//       path: item.path,
//       name: item.name,
//       meta: { title: item.title },
//       props: true,
//       component: () => import('@/views/admin/' + item.component)
//     })
//   })

// 3.添加vuex缓存
// store.state.nav.concat(addroutes)
// }

export default router
