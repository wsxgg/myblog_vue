import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ArticleEditView from '@/views/admin/ArticleEditView.vue'
import ArticleListView from '@/views/home/ArticleListView.vue'
import ArticleDetailView from '@/views/home/ArticleDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/wsx'
  },
  {
    path: '/:author',
    name: 'author-home',
    props: true,
    component: ArticleListView,
  },
  {
    path: '/:author/article/:aid',
    name: 'article-show',
    props: true,
    component: ArticleDetailView
  },
  {
    path: '/:author/article/edit/:aid',
    name: 'article-edit',
    props: true,
    component: ArticleEditView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
