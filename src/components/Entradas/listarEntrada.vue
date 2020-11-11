<template>
    <div class="col-12">
        <br>
        <!--Incio modal editar--> 
        <div class="modal fade" id="EditModal"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                  <!--aqui ira el componente editar --> 
                  <editar :dataEntrada="row"></editar>

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
                    <div v-if="mostrar">
                      <button type="button" data-toggle="modal" data-target="#AddModal"
                              style="margin-right:8px; color: white" class="btn btn-success">
                              <i class="fas fa-plus-circle"></i>  Agregar
                      </button>
                    </div>
                </div>
                <div class="col-8">
                  <!-- <pre> {{row}} </pre>-->
                  <center>Listado de Entradas</center>
                </div>
                <div class="col-2 text-rigth" style="text-align: center">
                    <div v-if="numPro == 1" class="alert bg-success text-white"><b>{{numPro}} Entrada</b> </div>
                    <div v-if="numPro != 1" class="alert bg-success text-white"><b>{{numPro}} Entradas</b> </div>
                </div>
              </div>  
          </div>
        </div>

        <div class="card-body"> <!-- CUERPO DE LISTADO-->

            <table class="table table-striped">
              <thead class="bg-primary text-white">
                <tr>
                  <th scope="col">Fecha de entrada</th>
                  <th scope="col">Nombre Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Sucursal</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Detalle</th>
                  <th scope="col" v-if="mostrar">Opciones</th>
                </tr>
              </thead>
                
              <tbody>
                <tr v-for="(item, index) in displayedEntradas" :key="index">
                  <td> {{item.Fecha}} </td>
                  <td> {{obtenerNombreProducto(item.idProducto)}} </td>
                  <td> {{item.Cantidad}} </td>
                  <td>${{obtenerNombrePrecioProducto(item.idProducto)}} </td>
                  <td>${{item.Monto}} </td>
                  <td> {{obtenerNombreSucursal(item.idSucursal)}} </td>
                  <td> {{obtenerNombreProveedor(item.idProducto)}} </td>
                  <td> {{item.Detalle}} </td>
                  <td v-if="mostrar"> 
                    <button @click="editar(item)"
                        type="button" data-toggle="modal" data-target="#EditModal"
                        style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                        <i class="fas fa-edit"></i>
                     </button>
                     <!-- AQUI IRA EL BOTON VER DETALLE -->
                  </td>
                </tr>
              </tbody> 
            </table>

            <div> <!--Paginacion -->
            
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

import agregar from '@/components/Entradas/agregarEntrada.vue'
import editar from '@/components/Entradas/editarEntrada.vue'

export default {
    name: 'listarEntrada',
    components: {
      editar,
      agregar
    },
    data() {
        return {
          numPro: 0,
          dataEntradas: [],
          dataSucursales: [],
          dataProductos: [],
          page: 1,
          perPage: 5,
          pages: [],
          row: Object,

          //mostrar agregar y editar Entradas segun Admin
          mostrar: false
        }
    },
    mounted() {
      this.dataEntradasL();
      this.dataSucursalL();
      this.dataProductoL();
      this.EsAdminSucursalPrincipal();
    },
    methods: {
      editar(item) {
          this.row = item;
          console.log(item);
      },
      eliminar: function(id, nombre) {
          Swal.fire({
                  title: 'Esta seguro que desea eliminar la Sucursal: '+nombre+'?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Eliminar'
                  }).then((result) => {

                    if (result.value) {
                      console.log(id);
                        axios.delete(`/Sucursales/eliminar/${id}`)
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
      dataEntradasL() {
          axios.get('/Entradas/listar')
          .then(response => {
                this.dataEntradas = response.data;
                console.log(this.dataEntradas);
                this.numPro = response.data.length;
                console.log(this.numPro);
          })
          .catch(
                error => console.log(error)
          );
      },
      dataSucursalL() {
          axios.get('/Sucursales/listar')
          .then(response => {
                this.dataSucursales = response.data;
                console.log(this.dataSucursales);
          })
          .catch(
                error => console.log(error)
          );
      },
      dataProductoL() {
          axios.get('/Productos/listar')
          .then(response => {
                this.dataProductos = response.data;
                console.log(this.dataProductos);
          })
          .catch(
                error => console.log(error)
          );
      },
      paginate(Entrada) {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage) - perPage;
          let to = (page * perPage);
          return Entrada.slice(from, to);
      },
      setEntrada() {
        let numberOfPages = Math.ceil(this.dataEntradas.length / this.perPage);
          for(let i = 1;  i <= numberOfPages; i++){
              this.pages.push(i);
          }
      },
      obtenerNombreProducto(id) {
        var nomb = '';
        for( let producto of this.dataProductos) {
            if(producto._id == id) {
                nomb = producto.NombreProducto;
            }
        }
        return nomb;
      },
      obtenerNombrePrecioProducto(id) {
        var price = '';
        for( let producto of this.dataProductos) {
            if(producto._id == id) {
                price = producto.Precio_Unitario;
            }
        }
        return price;
      },
      obtenerNombreSucursal(id) {
        var nomb = '';
        for( let sucursal of this.dataSucursales) {
            if(sucursal._id == id) {
                nomb = sucursal.Nombre;
            }
        }
        return nomb;
      },
      obtenerNombreProveedor(id) {
        var nomb = '';
        for( let producto of this.dataProductos) {
            if(producto._id == id) {
                nomb = producto.Proveedor.Nombre;
            }
        }
        return nomb;
      },
      EsAdminSucursalPrincipal() {
        if(sessionStorage.getItem('nomSucursal') == 'Sucursal Principal') {
          this.mostrar =  true;
        }else { this.mostrar =  false; }
      }
    },
    computed: {
      displayedEntradas() {
        return this.paginate(this.dataEntradas);
      }
    },
    watch: {
      dataEntradas() {
        this.setEntrada();
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