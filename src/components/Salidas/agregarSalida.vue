<template>
    <div class="content">
        <center>
            <div class="row">
                <div class="col-12">
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="enviarForm()">
                                <div class="form-row">
                                    <label>Fecha Actual:</label>
                                </div>
                                <div class="form-row">
                                   <div class="col-4">
                                            <input v-model="fechaLocal" type="text" disabled="disabled" class="form-control">
                                   </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <label>Código de Barra</label>
                                </div>
                                <div class="form-row">
                                    <div class="col-4">
                                        <input v-model="codigoProducto" type="number" class="form-control">
                                    </div>
                                    <div class="col-2">
                                        <button @click="buscarProducto()" class="btn btn-success">Buscar</button>
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                     <div class="col">
                                        <div class="form-row">
                                              <label class="text-left">Sucursal Destino</label>
                                        </div>
                                            <select class="form-control" v-model="idSucursalDestino" id="Sucursal_a_Seleccionar">
                                                <option value="0" selected="selected">-Sucursal-</option>
                                                <option v-for="(item, index) in dataSucursales" :value="item._id" :key="index">{{item.Nombre}}</option>
                                            </select>
                                        </div>
                                    <div class="col">
                                          <div class="form-row">
                                              <label class="text-left">Nombre de Producto</label>
                                          </div>
                                        <input v-model="nombreProducto" type="text" disabled="disabled" class="form-control">
                                    </div>
                                    <div>
                                          <div class="form-row">
                                              <label class="text-left">Proveedor</label>
                                          </div>
                                        <input v-model="nombreProveedor" type="text" disabled="disabled" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col">
                                        <div class="form-row">
                                            <label class="text-left">Cantidad</label>
                                        </div>
                                        <input v-model="cantidad" type="number" min="1" class="form-control">
                                    </div>
                                        <div class="col">
                                            <div class="form-row">
                                                <label class="text-left">Precio Unitario</label>
                                            </div>
                                            <input v-model="precioUnitario" type="number" disabled="disabled" class="form-control">
                                        </div>
                                    <div>
                                        <div class="form-row">
                                            <label class="text-left">Monto</label>
                                        </div>
                                        <input @keyup="calcularMonto()" v-model="monto" type="number" min="1" disabled="disabled" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col">
                                        <div class="form-row">
                                            <label class="text-left">Detalle</label>
                                        </div>
                                        <textarea v-model="detalle" class="form-control" cols="30" rows="5" placeholder=""></textarea>
                                    </div>
                                </div>
                                <br>
                            </form>
                            <br>
                            <center>
                              <div>
                                <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Agregar</button>
                                <button v-on:click="limpiar_form()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                              </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

export default {
    name: 'agregarSalida',
    data() {
        return {
            fechaLocal: '',
            detalle: '',
            idProducto_a_Enviar: '',
            cantidad: 0,
            monto: 0,
            nombreSucursal: sessionStorage.getItem('nomSucursal'), //este vendra incluido en el login, ahorita esta quemado 
            sucursalId: '5f9121b37ebf700017f7443d',//sessionStorage.getItem('sucursalId'), //este vendra incluido en el login, ahorita esta quemado
            idSucursalDestino: '5f9122a47ebf700017f744da',

            selection: '',
            codigoProducto: '',
            nombreProducto: '',
            precioUnitario: 0,
            nombreProveedor: '',
            cantidadMinima: false,

            //obteniendo la data de productos
            dataProductos: [],

            //obteniendo la data de proveedores
            dataSucursales: [],
            indiceSucursal: 0,
            sucursalesArray: []
        }
    },
    mounted() {
        this.dataProductosListar();
        this.getFechaActual();
        this.dataSucursalesListar();
    },
    methods: {
        
        //listando los productos
        dataProductosListar() {
            axios.get('/Productos/listar')
            .then(response => {
                this.dataProductos = response.data;
                console.log('productos:' + this.dataProductos);
            })
            .catch(
                error => console.log(error)
            );
        },
        //buscando segun codigo de barra
        buscarProducto(){
            if(this.codigoProducto != '') {
                for(let item of this.dataProductos) {
                    if(item.CodigoProducto == this.codigoProducto) {
                        this.idProducto_a_Enviar = item._id;
                        this.nombreProducto = item.NombreProducto;
                        this.nombreProveedor = item.Proveedor.Nombre;
                        this.precioUnitario = item.Precio_Unitario;
                    }
                }
            }
        },


        //obteniendo la fecha actual
        getFechaActual() {
            var fechaActual = new Date();
            this.fechaLocal = fechaActual.getDate() + "/" + (fechaActual.getMonth() +1) + "/" + fechaActual.getFullYear();
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
        //obteniendo el idSucursalDestino
        getIdSucursalDestino(){
            var opcionSeleccionada = document.getElementById("Sucursal_a_Seleccionar").value;
            this.indiceSucursal = opcionSeleccionada;
            this.sucursalesArray = this.data[this.indiceSucursal].Nombre
            var combo = document.getElementById("Sucursal_a_Seleccionar");
            var selected = combo.options[combo.selectedIndex].text;
            this.selection = selected;
        },


        //creando salida
        enviar_form() {
            if (this.fechaLocal != '' && this.detalle != '' && this.idProducto_a_Enviar != '' && this.cantidad != 0 && this.monto != 0 && this.sucursalId != '' && this.idSucursalDestino != '') {
                axios.post('/Salidas/crear',{
                    Fecha: this.fechaLocal,
                    Detalle: this.detalle,
                    idProducto: this.idProducto_a_Enviar,
                    Cantidad: this.cantidad,
                    Monto: this.monto,
                    idSucursal: this.sucursalId,
                    idSucursalDestino: this.idSucursalDestino
                })
                .then(response => {
                    Swal.fire({
                        title: 'Mensaje',
                        icon: 'success',
                        text: response.data.mensaje
                    });
                    this.limpiar_form()
                    location.reload()
                })
                .catch(
                    error => console.log(error)
                )
            }
            else{
                Swal.fire({
                title: 'Campos vacíos',
                icon: 'info',
                text: 'Todos los campos son requeridos.'
                });
            }
        },
        limpiar_form() {
            this.idProducto_a_Enviar = '';
            this.nombreProducto = '';
            this.nombreSucursal = '';
            this.proveedor = '';
            this.precioUnitario = 0;
            this.cantidad = 0;
            this.monto = 0;
            this.detalle = '';
        }
    },
    computed: {
        getPrecioUnitario() {
            return '$'+this.precioUnitario;
        }
    },

    watch: {
        cantidad() {
            if (this.cantidad) {
                if (this.cantidad < 1) {
                    this.cantidadMinima = true;
                }
                else{
                    this.cantidadMinima = false;
                    this.monto = this.precioUnitario * this.cantidad;
                }
            }
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