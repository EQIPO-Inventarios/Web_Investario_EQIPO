import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'
Vue.use(VueRouter)
 
  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/menu/ProductoListado',
    name: 'ProductoL',
    component: () => import(/* webpackChunkName: "" */ '@/views/Producto/ProductoList.vue')
  },
  {
    path: '/menu/ProveedorListado',
    name: 'ProveedorL',
    component: () => import(/* webpackChunkName: "" */ '@/views/Proveedor/ProveedorList.vue')
  },
  {
    path: '/menu/UsuarioListado',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "about" */ '@/views/User/UserList.vue')
  },
  {
    path: '/menu/SucursalListado',
    name: 'SucursalL',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Sucursal/SucursalList.vue')
  },
  {
    path: '/menu/EntradaListado',
    name: 'EntradaL',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Entrada/EntradaList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
