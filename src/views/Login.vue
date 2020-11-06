<template>
<div class="col-sm-8 main-section">
    <div v-for="item in msjError" :key="item"><!--AQUI IRA UN IF, SI HAY UN ERROR LO MOSTRARA  --->
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong> {{item.titulo}} </strong> {{item.mensaje}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>

        <div class="modal-dialog text-center" >
            <div class="col-sm-8 main-section">  
                <div class="modal-content">                 
                    <div class="col-12 user-img">
                        <img src="../assets/login.png"> 
                    </div>                   
                    <form class="col-12">
                        <div class="form-group">
                            <input type="text" class="form-control user" v-model="usuario" placeholder="Ingrese usuario">
                        </div>
                        <div class="form-group pass">
                            <input type="password" class="form-control" v-model="clave" placeholder="Ingrese clave">
                        </div>
                        <button v-on:click="login()" type="button" class="btn btn-success btn-block"><i class="fas fa-sign-in-alt"></i> Iniciar sesion</button>
                        <br>
                    </form>

                    <div>
                        <cargabasica v-show="patalla_carga"></cargabasica>
                    </div>
                </div> <!-- End modal content -->
            </div>
        </div>
</div>
</template>
<script>

import router from 'vue-router'
import axios from '../config/axiosLogin'
import {mapState ,mapMutations} from 'vuex'

import cargabasica from '@/components/PantallasCarga/cargabasica.vue'


export default {
    name: 'Login',
    components: {
        cargabasica
    },
    data() {
        return {
            usuario: '',
            clave: '',
            msjError: [],
            patalla_carga: false
        }
    },
    computed: {
        errores: function(){
            return this.msjError;
        },
        carga_load: function(){
            return this.patalla_carga;
        }
    },
    methods: {
        login(){
            if (this.usuario != "" && this.clave != "") {
                this.patalla_carga = true
                const options = {
                    headers: {"Content-Type": "application/json"}
                };
                axios.post("/Usuarios/login",
                    {    
                            usuario: this.usuario, 
                            password: this.clave               
                    },
                    options
                )
                .then(response => {                    
                    console.log(response.data)               
                    if(response.data != []){
                        this.$emit("authenticated", true);
                        sessionStorage.setItem('autenticado', response.data.token);
                        sessionStorage.setItem('usuario', response.data.Nombre);
                        sessionStorage.setItem('permiso', response.data.Numeronivel);
                        sessionStorage.setItem('nombreNivel', response.data.nivel);
                        sessionStorage.setItem('nomSucursal', response.data.NombreSucursal);
                        sessionStorage.setItem('sucursalId', response.data.idSucursal);

                        if(sessionStorage.getItem('autenticado') != '' && sessionStorage.getItem('usuario') != '' && sessionStorage.getItem('permiso') != '' && sessionStorage.getItem('nombreNivel') != '' && sessionStorage.getItem('nomSucursal') != '' &&sessionStorage.getItem('sucursalId') != ''){
                            if(sessionStorage.getItem('autenticado') != 'undefined' && sessionStorage.getItem('usuario') != 'undefined' && sessionStorage.getItem('permiso') != 'undefined' &&sessionStorage.getItem('nombreNivel') != 'undefined' && sessionStorage.getItem('nomSucursal') != 'undefined' &&sessionStorage.getItem('sucursalId') != 'undefined'){
                                this.$router.replace({ name: "Menu" });
                                location.reload();
                            }
                            else {
                                ssthis.$emit("authenticated", false);
                                this.$router.replace({ name: "Login" });
                            }
                        }
                        else {
                            this.$emit("authenticated", false);
                            this.$router.replace({ name: "Login" });
                        }

                    }else {
                        Swal.fire({
                            title: 'Datos incorrectos',
                            text: 'Usuario y/o Password incorrectos.',
                            icon: 'error'
                        });
                    }           
                })
                .catch(
                    error => console.log(error)
                );
            }else{
                Swal.fire({
                    title: 'Campos vacios!',
                    text: 'El usuario y password son requeridos.',
                    icon: 'error'
                });
            }
        }
  }
}
</script>
<style  scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto'); 

.body {
    font-family: 'Roboto', sans-serif;
    background: url(../assets/background.jpg) no-repeat center center fixed;
    background-size: cover;
}

.main-section {
    margin: auto;
    margin-top: 130px;
    padding: 0;
}

.modal-content {
    background-color: #3b4652;
    opacity: 0.95;
    padding: 0 18px;
    box-shadow: 0px 0px 3px #848484;
}

.user-img {
    margin-top: -50px;
    margin-bottom: 35px;
}

.user-img img {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    box-shadow: 0px 0px 2px #848484;
}

.form-group {
    margin-bottom: 25px;
}

.form-group input {
    margin-bottom: 15px;
    height: 45px;
    border-radius: 15px;
    padding-left: 54px;
}


.form-group::before {
    font-family: 'Font Awesome\ 5 Free';
    content: "\f007";
    position: absolute;
    font-size: 20px;
    color: black;
    left: 28px;
    padding-top: 4px;
}

.form-group:last-of-type::before {
    content: "\f022";
}
</style>