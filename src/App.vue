<template>
  <div id="app" class="content">
        <div id="nav" class="content">
            <router-link v-if="authenticated" to="/menu" ></router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
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
</style>