<template>
  <div class="col-12">
        <br>
        <!--Incio modal editar--> 
        <div class="modal fade" id="EditModal"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Proveedor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <!--aqui ira el componente editar --> 
                  <editar :dataUser="row"></editar>

              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div> <!--Final modal editar--> 

        <div class="modal fade" id="AddModal"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Proveedor</h5>
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
                              style="margin-right:8px; color: white" class="btn btn-success">
                              <i class="fas fa-plus-circle"></i>  Agregar
                      </button>
                    </div>
                </div>
                <div class="col-8">
                  <!-- <pre> {{row}} </pre>-->
                  <center>Listado de Proveedores</center>
                </div>
                <div class="col-2 text-rigth" style="text-align: center">
                    <div v-if="numPro == 1" class="alert bg-success text-white"><b>{{numPro}} Proveedor</b> </div>
                    <div v-if="numPro != 1" class="alert bg-success text-white"><b>{{numPro}} Proveedores </b> </div>
                </div>
              </div>  

          </div>
          <div class="card-body">

            <div class="row ml-1">
            <form>
              <div class="row">
                <div class="col-3"><label for="">Buscador:</label></div>
                <div class="col"> <input v-model="search" type="text" class="form-control" placeholder="Buscar por Nombre ..."></div>
              </div>
            </form>
          </div>

            <table class="table table-striped">
              <thead class="bg-primary text-white">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Razon social</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in displayedProvider" :key="index">
                  <td> {{item.Nombre}} </td>
                  <td> {{item.Contacto.Correo}} </td>
                  <td> {{item.Razon_Social}} </td>
                  <td> {{item.Contacto.Telefono}} </td>
                  <td> {{item.Contacto.Direccion.Departamento}}, {{item.Contacto.Direccion.Municipio}} </td>
                  <td>
                    <button @click="editar(item)"
                        type="button" data-toggle="modal" data-target="#EditModal"
                        style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                        <i class="fas fa-edit"></i>
                     </button>
                    <button v-on:click="eliminar(item._id, item.Nombre)" class="btn btn-danger btn-sm" title="Eliminar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div > <!-- Paginacion -->
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
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

import agregar from '@/components/Proveedores/agregarProveedor.vue'
import editar from '@/components/Proveedores/editarProveedor.vue'

export default {
  name: 'listaProveedor',
  components: {
      editar,
      agregar
  },
  data: function() {
      return {
        numPro: 0,
        dataProveedores: [],
        page: 1,
        perPage: 5,
        pages: [],
        row: Object,
        search: ''
      }
  },
  mounted() {
      this.dataProvider();
  },
  methods: {
      editar(item) {
          this.row = item;
      },
      eliminar: function(id, nombre) {
          Swal.fire({
                  title: 'Esta seguro que desea eliminar el proveedor '+nombre+'?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Eliminar'
                  }).then((result) => {

                    if (result.value) {
                      console.log(id);
                        axios.delete(`/Proveedores/eliminar/${id}`)
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
      dataProvider() {
          axios.get('/Proveedores/listar')
          .then(response => {
                this.dataProveedores = response.data;
                console.log(this.dataProveedores);
                this.numPro = response.data.length;
                console.log(this.numPro);
          })
          .catch(
                error => console.log(error)
          );
      },
      paginate(Providers) {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage) - perPage;
          let to = (page * perPage);
          return Providers.slice(from, to);
      },
      setProviders() {
          let numberOfPages = Math.ceil(this.dataProveedores.length / this.perPage);
          for(let i = 1;  i <= numberOfPages; i++){
              this.pages.push(i);
          }
      }
  },
  computed: {
    displayedProvider() {
      return this.paginate(this.dataProveedores);
    }
  },
  watch: {
    dataProveedores() {
      this.setProviders();
    },
    search(){
          if (this.search != '') {
              axios.get(`/Proveedores/listarPorNombre/${this.search}`)
              .then(response => {
                    this.dataProveedores = response.data;
                    console.log('Estos son buscados: '+this.dataProveedores);
              })
              .catch(
                    error => console.log(error)
              );
          } else {
              axios.get('/Proveedores/listar')
              .then(response => {
                    this.dataProveedores = response.data;
                    console.log(this.dataProveedores);
                    this.numPro = response.data.length;
                    console.log(this.numPro);
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