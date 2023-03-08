import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ArticleEditView from '@/views/admin/ArticleEditView.vue'
import ArticleListView from '@/views/home/ArticleListView.vue'
import ArticleDetailView from '@/views/home/ArticleDetailView.vue'
import ArticleCreateView from '@/views/admin/ArticleCreateView.vue'
import LoginView from '@/views/home/LoginView.vue'
import RegisterView from '@/views/home/RegisterView.vue'
import HomePageView from '@/views/home/HomePageView.vue'
import NotFoundView from '@/views/home/404View.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePageView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
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
  {
    path: '/:author/article/create',
    name: 'article-create',
    props: true,
    component: ArticleCreateView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: "/:pathMatch(.*)",
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
