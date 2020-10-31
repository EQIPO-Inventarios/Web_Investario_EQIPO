import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      autenticado: false,
      nombreUsuario: sessionStorage.getItem('autenticado') || null,
      token: '', 
      permiso: 0
  },
  mutations: {

  },
  actions: {



  },
  modules: {
  }
})
