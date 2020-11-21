<template>
    <div class="col-12">
        <br>
        <!-- Inicio modal editar -->
        <div class="modal fade" id="EditModal"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <!--aqui ira el componente editar --> 
                  <editar :dataUsuario="row"></editar>

              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div> <!--Final modal editar-->

        <div class="modal fade" id="AddModal"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <!--aqui ira el componente editar --> 
                  <agregar ></agregar>

              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col">
                        <div>
                            <button type="button" data-toggle="modal" data-target="#AddModal"
                                    style="margin-right:8px; color:white" class="btn btn-success">
                                    <i class="fas fa-plus-circle"></i>     Agregar
                            </button>
                        </div>
                    </div>
                    <div class="col-8">
                        <center>Listado de Usuarios</center>
                    </div>
                    <div class="col-2 text-rigth" style="text-align: center">
                        <div v-if="numUsu == 1" class="alert bg-success text-white"><b>{{numUsu}} Usuario</b></div>
                        <div v-if="numUsu != 1" class="alert bg-success text-white"><b>{{numUsu}} Usuarios</b></div>
                    </div>
                </div>
            </div>
            <div class="card-body">

                <div class="row ml-1">
                    <form>
                    <div class="row">
                        <div class="col-3"><label for="">Buscador:</label></div>
                        <div class="col"> <input v-model="search" type="text" class="form-control" placeholder="Buscar por usuario ..."></div>
                    </div>
                    </form>
                </div>

                <div class="table-responsive">
                <table class="table table-striped table-sm" style="font-size:16px">
                    <thead class="bg-primary text-white text-center">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>DUI</th>
                            <th>NIT</th>
                            <th>Telefono</th>
                            <th>Fecha de nacimiento</th>
                            <th>Direccion</th>
                            <th>Usuario</th>
                            <th>Nivel</th>
                            <th>Sucursal</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in displayedUsuario" :key="index">
                            <td>{{item.personal.Nombres}} {{item.personal.Apellidos}}</td>
                            <td>{{item.personal.Contacto.Correo}}</td>
                            <td>{{item.personal.DUI}}</td>
                            <td>{{item.personal.NIT}}</td>
                            <td>{{item.personal.Contacto.Telefono}}</td>
                            <td>{{item.personal.Fecha_Nacimiento}}</td>
                            <td>{{item.personal.Contacto.Direccion.Departamento}}, {{item.personal.Contacto.Direccion.Municipio}}</td>
                            <td>{{item.usuario}}</td>
                            <td>{{item.nivel.TipoNivel}}</td>
                            <td>{{item.personal.idSucursal}}</td>
                            <td>
                                <button @click="editar(item)"
                                        type="button" data-toggle="modal" data-target="#EditModal"
                                        style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button v-on:click="eliminar(item._id, item.personal.Nombres, item.personal.Apellidos)" class="btn btn-danger      btn-sm" title="Eliminar">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- paginacion -->
                <div>
                    <button  class=" btn btn-primary btn-sm mr-1" 
                            type="button" 
                            v-if="page != 1"
                            @click="page--">
                                Regresar 
                    </button>
                    <button class=" btn btn-primary btn-sm mr-1"
                            type="button"
                            v-for="pageNumber in pages.slice(page- 1, page+ 0)" :key="pageNumber"
                            @click="page = pageNumber">
                        {{pageNumber}}
                    </button>
                    <button class=" btn btn-primary btn-sm mr-1"
                            type="button"
                            v-if="page < pages.length"
                            @click="page++">
                        Siguiente
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

import agregar from '@/components/Users/agregarUsuario.vue'
import editar from '@/components/Users/editarUsuario.vue'

export default {
    name: 'listarUsuario',
    components: {
        agregar,
        editar
    },
    data() {
        return {
            numUsu: 0,
            dataUsuarios: [],
            page: 1,
            perPage: 5,
            pages: [],
            row: Object,
            dataSucursales: [],
            search: '',
            permisos: sessionStorage.getItem('permiso')
        }
    },
    mounted() {
        this.dataUsuariosL();
    },
    methods: {
        editar(item) {
          this.row = item;
        },
        eliminar: function(id, nombres, apellidos) {
            Swal.fire({
                title: 'Esta seguro que desea eliminar el usuario '+nombres+' '+apellidos+'?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.value) {
                    console.log(id);
                        axios.delete(`/Usuarios/eliminar/${id}`)
                        .then(response => {
                              console.log(response.data.mensaje);
                              Swal.fire({
                                title: 'Eliminado',
                                icon: 'success',
                                text: response.data.mensaje
                                });
                              location.reload();
                        })
                        .catch(
                              error => console.log(error)
                        );
                }
            })
        },
        dataUsuariosL() {
            axios.get('/Usuarios/listar')
            .then(response => {
                this.dataUsuarios = response.data;
                console.log(this.dataUsuarios);
                this.numUsu = response.data.length;
                console.log(this.numUsu);
            })
            .catch(
                error => console.log(error)
            );
        },
        paginate(Users) {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage) - perPage;
          let to = (page * perPage);
          return Users.slice(from, to);
        },
        setUsers() {
            let numberOfPages = Math.ceil(this.dataUsuarios.length / this.perPage);
            for(let i = 1;  i <= numberOfPages; i++){
                this.pages.push(i);
            }
        }
    },
    computed: {
        displayedUsuario() {
        return this.paginate(this.dataUsuarios);
        }
    },
    watch: {
        dataUsuarios() {
            this.setUsers();
        },
        search(){
          if (this.search != '') {
                axios.get(`/Usuarios/buscarUsuarios/${this.search}`)
                .then(response => {
                        this.dataUsuarios = response.data;
                        console.log('Estos son buscados: '+this.dataUsuarios);
                })
                .catch(
                        error => console.log(error)
                );
          }
          else {
                axios.get('/Usuarios/listar')
                .then(response => {
                    this.dataUsuarios = response.data;
                    console.log(this.dataUsuarios);
                    this.numUsu = response.data.length;
                    console.log(this.numUsu);
                })
                .catch(
                    error => console.log(error)
                );
          }
      }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto'); 

.body {
    font-family: 'Roboto', sans-serif;
}
.content {
  width: 100%;
  height: 100%;
}
.EnlaceP {
  color: white;
  text-decoration: none;
}
h5 {
  text-align: center;
}
</style>