<template>
    <div class="col-12">
        <br>
        <!--Incio modal editar--> 
        <div class="modal fade" id="EditModal"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <!--aqui ira el componente editar --> 
                  <editar :dataProduct="row"></editar>

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
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <!--aqui ira el componente add --> 
                  <agregar></agregar>

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
                  <center>Listado de Productos</center>
                </div>
                <div class="col-2 text-rigth" style="text-align: center">
                    <div v-if="numPro == 1" class="alert bg-success text-white"><b>{{numPro}} Producto</b> </div>
                    <div v-if="numPro != 1" class="alert bg-success text-white"><b>{{numPro}} Productos </b> </div>
                </div>
              </div>  
          </div>
        </div>

        <div class="card-body"> <!-- CUERPO DE LISTADO-->

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
                  <th scope="col">Codigo de Barra</th>
                  <th scope="col">Nombre Producto</th>
                  <th scope="col">Material</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">Caracteristicas</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in displayedProducts" :key="index">
                  <td> {{item.CodigoProducto}} </td>
                  <td> {{item.NombreProducto}} </td>
                  <td> {{item.Material}} </td>
                  <td> {{item.Existencias}} </td>
                  <td>${{item.Precio_Unitario}} </td>
                  <td>{{item.Caracteristicas}} </td>
                  <td> {{item.Proveedor.Nombre}} </td>
                  <td> 
                    <button @click="editar(item)"
                        type="button" data-toggle="modal" data-target="#EditModal"
                        style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                        <i class="fas fa-edit"></i>
                     </button>
                    <button @click="eliminar(item._id, item.NombreProducto)" class="btn btn-danger btn-sm" title="Eliminar">
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
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

import agregar from '@/components/ProductoSucursales/agregarProducto.vue'
import editar from '@/components/ProductoSucursales/editarProducto.vue'

export default {
    name: 'listaProductoSu',
    components: {
      editar,
      agregar
    },
    data() {
        return {
          numPro: 0,
          dataProductos: [],
          page: 1,
          perPage: 5,
          pages: [],
          row: Object,
          search: '',
          sucursalId: sessionStorage.getItem('sucursalId')
        }
    },
    mounted() {
        this.bringProducts();
    },
    methods: {
      bringProducts(){
          axios.get(`/ProductoSucursales/listar/${this.sucursalId}`)
          .then(response => {
                this.dataProductos = response.data;
                console.log(this.dataProductos);
                this.numPro = response.data.length;
                console.log(this.numPro);
          })
          .catch(
                error => console.log(error)
          );
      },
      editar(item) {
          this.row = item;
          console.log(item);
      },
      eliminar(id, nombre) {
          Swal.fire({
                  title: 'Esta seguro que desea eliminar el producto: '+nombre+'?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Eliminar'
                  }).then((result) => {

                    if (result.value) {
                        axios.delete(`/ProductoSucursales/eliminar/${id}`)
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
      paginate(Products) {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage) - perPage;
          let to = (page * perPage);
          return Products.slice(from, to);
      },
      setProducts() {
          let numberOfPages = Math.ceil(this.dataProductos.length / this.perPage);
          for(let i = 1;  i <= numberOfPages; i++){
              this.pages.push(i);
          }
      }
    },
    computed: {
      displayedProducts() {
        return this.paginate(this.dataProductos);
      }
    },
    watch: {
      dataProductos() {
        this.setProducts();
      },
      search(){
          axios.get(`/Productos/listarPorNombre/${this.search}`)
          .then(response => {
                this.dataProductos = response.data;
                console.log('Estos son buscados: '+this.dataProductos);
          })
          .catch(
                error => console.log(error)
          );
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