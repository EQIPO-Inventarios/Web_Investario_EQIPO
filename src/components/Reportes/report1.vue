<template>
    <div>
        <div class="form-row">
            <div class="col">
                <form>
                    <select id="selectProveedor" class="custom-select" @change="ShowSelected()">
                        <option value="0" selected="selected"> - Seleccione Proveedor - </option>
                        <option :value="item.Nombre" v-for="(item, index) in dataProviders" :key="index"> {{item.Nombre}} </option>
                    </select>
                </form>
            </div>
        </div>
        <br>
        <div class="form-row" id="Reporte">         
                <table class="table table-striped" >
                    <thead class="bg-dark text-white">
                        <tr>
                            <th scope="col">Codigo de Barra</th>
                            <th scope="col">Nombre Producto</th>
                            <th scope="col">Material</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Caracteristicas</th>
                            <th scope="col">Proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataListar" :key="index">
                            <td> {{item.CodigoProducto}} </td>
                            <td> {{item.NombreProducto}} </td>
                            <td> {{item.Material}} </td>
                            <td> {{item.Existencias}} </td>
                            <td>${{item.Precio_Unitario}} </td>
                            <td>{{item.Caracteristicas}} </td>
                            <td> {{item.Proveedor.Nombre}} </td>
                        </tr>
                    </tbody>
                </table>
        </div>
        <div v-if="mostrar">
            <button @click="printReport()" class="btn btn-warning" title="Print">
                <i class="fas fa-print"></i>
            </button>
        </div>
        <br>
    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'
export default {
    name: 'report1',
    data(){
        return {
            dataProductos: [],
            dataProviders: [],
            dataListar: [],
            nomSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId'),
            Seleccionado: '',
            mostrar: false
        }
    },
    mounted() {
        this.bringProducts();
        this.bringSuppliers();
    },
    methods: {
        bringProducts(){
          if (this.nomSucursal == 'Sucursal Principal') {
                axios.get('/Productos/listar')
                .then(response => {
                        this.dataProductos = response.data;
                        console.log(this.dataProductos);
                })
                .catch(
                        error => console.log(error)
                );
          } else {
                axios.get(`/ProductoSucursales/listar/${this.sucursalId}`)
                .then(response => {
                        this.dataProductos = response.data;
                        console.log(this.dataProductos);
                })
                .catch(
                        error => console.log(error)
                );
          }
        },
        ShowSelected() {
          /* Para obtener el valor id para el selectbox de municipios*/
          let nombreProveedor = document.getElementById("selectProveedor").value;
          this.Seleccionado = nombreProveedor;          
        },
        bringSuppliers() {
            axios.get('/Proveedores/listar')
            .then(response => {
                    this.dataProviders = response.data;
                    console.log(this.dataProviders);
            })
            .catch(
                    error => console.log(error)
            );
        },
        printReport() {
            const printContents = document.getElementById('Reporte').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            location.reload()
        }   
    },
    watch: {
        Seleccionado(){
            if(this.Seleccionado){
                this.dataListar = [];
                let data = this.dataProductos;
                for(let producto of data){ // con este for obtengo el nombre de material que me encuentre
                    if(this.Seleccionado == producto.Proveedor.Nombre){
                        this.dataListar.push(producto);
                    }
                }

                if(this.dataListar != []){
                    this.mostrar = true;
                }else{ this.mostrar = false; }
            }
        }
    }
}
</script>