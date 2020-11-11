<template>
    <div class="col-12">
        <br>
         <!--Incio modal editar--> 
        <div class="modal fade" id="EditModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar Salidas</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                         <!--Aca ira componente editar -->
                         <center>
                             <editar :dataSalida="row"></editar>
                         </center>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        <!-- agregar -->
            <div class="modal fade" id="AddModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar Salida</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <center> 
                                <!-- aca va el componente agregar -->
                                <agregar></agregar>
                            </center>
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
                            <center>Listado de Salidas</center>
                        </div>
                        <div class="col-2 text-rigth" style="text-align: center">
                            <div v-if="numSal == 1" class="alert bg-success text-white"><b>{{numSal}} Salida</b> </div>
                            <div v-if="numSal != 1" class="alert bg-success text-white"><b>{{numSal}} Salidas</b> </div>
                        </div>
                    </div>
                </div>

                    <div class="card-body">
                
                    <table class="table table-striped">
                    <thead class="bg-primary text-white" >
                    <tr>
                        <td scope= "col">Fecha</td>
                        <td scope= "col">Codigo de barra</td>
                        <td scope= "col">Producto</td>
                        <td scope= "col">Proveedor</td>
                        <td scope= "col">Sucursal</td>
                        <td scope= "col">Sucursal Destino</td>
                        <td scope= "col">Precio Unitario</td>
                        <td scope= "col">Cantidad</td>
                        <td scope= "col">Monto</td>
                        <td scope= "col">Opciones</td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="(item, index) in displayedSalida" :key="index">
                        <td>{{item.Fecha}}</td>
                        <td>{{getCodigoProducto(item.idProducto)}}</td>
                        <td>{{getNameProduct(item.idProducto)}}</td>
                        <td>{{getNombreProveedor(item.idProducto)}}</td>
                        <td>Sucursal Central</td>
                        <td>{{obtenerNombreSucursal(item.idSucursalDestino)}}</td>
                        <td>$ {{getPrecioUnitario(item.idProducto)}}</td>
                        <td>{{item.Cantidad}}</td>
                        <td>$ {{item.Monto}}</td>
                        <td>
                            <button
                                type="button" data-toggle="modal" data-target="#EditModal"
                                style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                        <!-- paginacion -->
                     <div>
                     <button class="btn btn-primary btn-sm mr-1"
                        type="button"
                        v-if="page != 1"
                        @click="page--">
                        Regresar
                    </button>
                    <button class="btn btn-primary btn-sm mr-1"
                        type="button"
                        v-for="pageNumber in pages.slice(page- 1, page+ 0)" :key="pageNumber">
                        {{pageNumber}}
                    </button>
                    <button class="btn btn-primary btn-sm mr-1"
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

import agregar from '@/components/Salidas/agregarSalida.vue'
import editar from '@/components/Salidas/editarSalida.vue'

export default {
    name: 'listarSalida',
    components: {
        //aca van los componentes
        agregar,
        editar
    },
    data: function(){
        return{
            numSal: 0,
            dataSalidas: [],
            page: 1,
            perPage: 5,
            pages: [],
            row: Object,

            //data de los productos
            dataProductos: [],

            //data de las sucursales
            dataSucursales: [],

            //data de los proveedores
            dataProveedores: []
        }
    },
    mounted() {
        this.dataSalidasListar();
        this.dataProductosListar();
        this.dataSucursalesListar();
        //this.getNameProduct();
        //this.getCodigoProducto();
        //this.obtenerNombreSucursal();
        //this.getNombreProveedor();
        //this.getPrecioUnitario();
    },
    methods: {
        editar(item) {
            this.row = item;
        },
        //obteniendo las salidas
        dataSalidasListar() {
            axios.get('/Salidas/listar')
            .then(response => {
                this.dataSalidas = response.data;
                console.log(this.dataSalidas);
                this.numSal = response.data.length;
                console.log(this.numSal);
            })
            .catch(
                error => console.log(error)
            );
        },
        

        //obteniendo los productos
        dataProductosListar(){
            axios.get('/Productos/listar')
            .then(response => {
                    this.dataProductos = response.data;
                    console.log(this.dataProductos);
            })
            .catch(
                    error => console.log(error)
            );
        },
        //obteniendo el nombre del producto
        getNameProduct(id){
            var nombreProducto = '';
            for(let item of this.dataProductos) {
                if (item._id == id) {
                    nombreProducto = item.NombreProducto;
                }
            }
            return nombreProducto;
        },
        //obteniendo el codigo de barra
        getCodigoProducto(id){
            var codigo = '';
            for(let item of this.dataProductos) {
                if (item._id == id) {
                    codigo = item.CodigoProducto;
                }
            }
            return codigo;
        },
        //obteniendo el nombre del proveedor
        getNombreProveedor(id){
            var nombre = '';
            for(let item of this.dataProductos) {
                if (item._id == id) {
                    nombre = item.Proveedor.Nombre;
                }
            }
            return nombre;
        },
        //obteniendo el precio unitario
        getPrecioUnitario(id){
            var precio = '';
            for(let item of this.dataProductos) {
                if (item._id == id) {
                    precio = item.Precio_Unitario;
                }
            }
            return precio;
        },


        //obteniendo las sucursales
        dataSucursalesListar(){
            axios.get('/Sucursales/listar')
            .then(response => {
                    this.dataSucursales = response.data;
                    console.log(this.dataSucursales);
            })
            .catch(
                    error => console.log(error)
            );
        },
        //obteniendo el nombre de la sucursal
        obtenerNombreSucursal(id){
            var nombre = '';
            for(let item of this.dataSucursales) {
                if (item._id == id) {
                    nombre = item.Nombre;
                }
            }
            return nombre;
        },


        //metodos del paginado
        paginate(Salida){
            let page =this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return Salida.slice(from, to);
        },
        //calculando el paginado
        setSalida(){
            let numberOfPages = Math.ceil(this.dataSalidas.length / this.perPage);
            for(let i = 1; i <= numberOfPages; i++){
                this.pages.push(i);
            }
        }
    },
    computed: {
        displayedSalida(){
            return this.paginate(this.dataSalidas);
        }
    },
    watch: {
        dataSalidas(){
            this.setSalida();
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