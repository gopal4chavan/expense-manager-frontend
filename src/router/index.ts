import Vue from 'vue'
import VueRouter, { NavigationGuardNext, RouteConfig, Route } from 'vue-router'
import Login from '@/views/Login.vue';
import CreateGroup from '@/views/CreateGroup.vue';
import Home from '@/views/Home.vue';
import Accounts from '@/components/Accounts/Accounts.vue'
import Dashboard from '@/components/Dashboard.vue'
import Expenses from '@/components/Expenses.vue'
import GroupInfo from '@/components/GroupInfo.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard,
    children: [
      {path: '/dashboard', name: 'Dashboard', component: Dashboard},
      {path: '/expenses', name: 'Expenses', component: Expenses},
      {path: '/group-info', name: 'GroupInfo', component: GroupInfo},
      {path: '/accounts', name: 'Accounts', component: Accounts},
    ]
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: authGuard,
    component: Login
  },
  {
    path: '/create-group',
    name: 'CreateGroup',
    beforeEnter: authGuard,
    component: CreateGroup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function authGuard(to: Route, _: Route, next: NavigationGuardNext) {
  const userLoggedIn = localStorage.getItem('access-token');
  const noAuthRoutes = ['Login', 'CreateGroup'];
  if(userLoggedIn) {
    if(noAuthRoutes.includes(to.name as string)) {
      next({name: 'Dashboard'});
    }else{
      next();
    }
  }else{
    if(noAuthRoutes.includes(to.name as string)) {
      next();
    }else{
      next({name: 'Login'});
    }
  }
}

export default router
