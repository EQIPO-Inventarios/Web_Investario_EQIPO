<template>
    <div class="content">
        <div >
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand">
                    <router-link to="/menu" class="EnlaceP"><i class="fas fa-home"></i>  Panel General</router-link>
                </a>

                <div class="EnlaceP">
                    <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown mr-4" v-if="permiso == 1 ">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <router-link to="/menu/UsuarioListado">
                                    <span class="EnlaceP"><i class="fas fa-address-card"></i>   Usuarios</span> 
                                </router-link>
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 1 ">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <router-link to="/menu/SucursalListado">
                                    <span class="EnlaceP"><i class="fas fa-building"></i>   Sucursales</span> 
                                </router-link>
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 1 || permiso == 3">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <router-link to="/menu/ProductoListado">
                                    <span class="EnlaceP"><i class="fas fa-shopping-basket"></i>   Produtos</span> 
                                </router-link>  
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 1 || permiso == 3">
                            <a class="nav-link " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <router-link to="/menu/ProveedorListado">
                                    <span class="EnlaceP"><i class="fas fa-users"></i>   Proveedores</span> 
                                </router-link>                               
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 1 || permiso == 3">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="EnlaceP"><i class="fas fa-cart-arrow-down"></i>   Entradas</span>
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 1 || permiso == 3">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               <router-link to="/menu/SalidaListado">
                                     <span class="EnlaceP"><i class="fas fa-cash-register"></i>   Salidas</span> 
                               </router-link>
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 2">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="EnlaceP"><i class="fas fa-archive"></i>    Reportes</span> 
                            </a>
                        </li>
                        <li class="nav-item dropdown mr-4" v-if="permiso == 3">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="EnlaceP"><i class="fas fa-tasks"></i>   Peticion</span> 
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- AQUI VA EL CONTENIDO DE CERRAR SESSION--->
                <form class="form-inline">
                    <label class="navbar-brand">
                        <p class="usuario EnlaceP">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
                            </svg>
                            {{mostrar_usuario}} 
                            <br> 
                            <span style="font-size: 14px;">{{mostrarNombreNivel}}</span>
                        </p>
                    </label> 
                    <input style="margin-left: 8px; margin-right:0px" type="submit" value="Logout" v-on:click="logout()" replace class="btn btn-danger btn-sm"/>               
                </form>
            </nav>
        </div>
        
    </div>
</template>
<script>
import router from 'vue-router'
import axios from 'axios'

export default {
    name: 'menuComponent',
    components:{
        
    },
      data(){
        return {
            permiso: sessionStorage.getItem('permiso'),
            token: sessionStorage.getItem('autenticado')
        }
    },
    mounted() {
    
        //aqui deberia ir una consulta a la base de datos para saber si el token es valido
        if (this.token == null) {
            this.$router.replace({ name: "Login" })
        }
        
      
    },
    computed:{
        mostrar_usuario: function(){
            const session = sessionStorage.getItem('usuario');
            this.Usuario = session;
            return session;
        },
        mostrarNombreNivel: function(){
            return sessionStorage.getItem('nombreNivel');
        },
        is_autenticated: function(){
            return sessionStorage.getItem('autenticado');
        }
    },
    methods: {
        logout(){
            sessionStorage.removeItem('autenticado');
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('permiso');
            sessionStorage.removeItem('nombreNivel');
            this.$emit("authenticated", false);
            this.$router.replace({ name: "Login" });
            location.reload();
        }
    }  
  }
</script>
<style scoped>
.usuario {
    font-size: 12px;
}
.EnlaceP {
    color: white;
    text-decoration: none   
}
.content {
  width: 100%;
  height: 100%;
}

</style>