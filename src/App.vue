<template>
  <div id="app" class="content">
        <div id="nav" class="content">
            <router-link v-if="authenticated" to="/menu" ></router-link>
        </div>
        <transition name="slide-fade" mode="out-in">
            <router-view @authenticated="setAuthenticated" />
        </transition>
  </div>
</template>

<script>
import Login from '@/views/Login.vue'
export default {
  name: 'App',
  components: {
    Login
  },
  data() {
      return {
      authenticated: false,
      session: sessionStorage.getItem('autenticado') || null

      }
  },
  mounted() {
      if(!this.authenticated) {
        if (this.session == null) {
            this.$router.replace({ name: "Login" });
        }
           
      }
  },
   methods: {
      setAuthenticated(status) {
          this.authenticated = status;
      }
  }       
  
}
</script>
<style>
.content {
  width: 100%;
  height: 100%;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>