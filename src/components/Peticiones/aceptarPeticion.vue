<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
            <br>
            <div class="card">
                <div class="card-body">
                    <!-- @submit.prevent="enviarForm()" -->
                <form >
                     <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Fecha:</label>
                                <input v-model="convertirFecha" type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="nomsuc">Sucursal: </label>
                                <input v-model="nombreSucursal" type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div>
                        <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Nombre producto:</label>
                                <input v-model="nombreProducto" type="text" id="nompro" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="price">Proveedor:</label>
                                <input v-model="nombreProveedor" type="text" id="price" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        


                        </div>
                        <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Cantidad:</label>
                                <input v-model.number="cantidad" type="number" min="1" class="form-control" required="required" disabled="disabled">
                                <!-- <p v-if="cantidadMinima" class="wd-2 bg-danger text-white"> Cantidad mayor o igual a 1</p> -->
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="price">Precio producto:</label>
                                <input :value="callPrecio" type="text" id="price" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        
                        </div>
                        <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Detalle:</label>
                                <textarea v-model="detalle" class="form-control" cols="10" rows="" placeholder="Detalles ..." disabled="disabled"></textarea>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>   
                <br>
                <div>
                    <center>
                            <button @click="enviarForm()"  type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Aceptar</button>
                            <button @click="limpiarForm()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </center>
                </div>           
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

export default {
    name: 'aceptarPeticion',
    props: {
        dataPeticion: { Object }
    },
    data() {
        return {
            //variables para recuperar la data de la peticion
            id: '',
            fecha: '',
            detalle: '',
            productoId: '',
            cantidad: '',
            idSucursalDestino: '',
            estadoPeticion: '',

            //recuperando el nombre del producto
            dataProductos: [],
            nombreProducto: '',
            nombreProveedor: '',
            precio: 0,
            dataSucursales: [],
            nombreSucursalDestino: '',

            //variables para recupoerar el id de la sucursal local
            nombreSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId'),
            minCant: false,

            //convirtiendo la fecha
            fechaNueva: '',
            d: '',
            m: '',
            m2: '',
            a: '',
            newf: ''
        }
    },
    mounted() {
        this.obtenerProductosListar();
    },
    methods: {
        //obteniendo los productos
        obtenerProductosListar() {
            axios.get('/Productos/listar')
            .then(response => {
                this.dataProductos = response.data;
                console.log(this.dataProductos);
            })
            .catch(
                error => console.log(error)
            );
        },

        enviarForm() {
            if(this.id != '' && 
                this.detalle != '' && 
                this.productoId != '' && 
                this.cantidad != 0){ 
                //validando campos numericos
                if (this.cantidad >= 1 ) {
                    axios.put('/PeticionEntradas/aceptar',{
                        _id: this.id,
                        Fecha: this.newf,
                        Detalle: this.detalle,
                        idProducto: this.productoId,
                        Cantidad: this.cantidad,
                        idSucursal: this.sucursalId,
                        idSucursalDestino: this.idSucursalDestino
                    })
                    .then(response => {                 
                        console.log(response.data.mensaje);                 
                        Swal.fire({
                        title: 'Mensaje',
                        icon: 'success',
                        text: response.data.mensaje
                        });
                        this.limpiarForm();
                        location.reload();
                    })
                    .catch(
                        error => console.log(error)
                    )
                }else {
                    Swal.fire({
                    title: 'Campos numericos invalidos',
                    icon: 'info',
                    text: 'Verifique los campos numericos...'
                    });
                }

            }else{
                Swal.fire({
                    title: 'Campos vacios',
                    icon: 'info',
                    text: 'Todos los campos son requeridos.'
                });
            }
        },

        limpiarForm() {
            this.fecha = '';
            this.nombreProducto = '';
            this.nombreProveedor = '';
            this.cantidad = '';
            this.precio = '';
            this.detalle = '';
        }

        

    },
    computed: {
        callPrecio(){
            return '$'+this.precio;
        },
        convertirFecha(){
            this.fechaNueva = '';
            if(this.fecha != ''){
                this.fechaNueva = this.fecha;
                console.log(this.fechaNueva);
                this.fechaNueva.toLocaleString();
                //this.fechaNueva = this.fechaNueva.replace(/[-]/g, '');
                this.d = this.fechaNueva.substr(0, 2);
                this.m = this.fechaNueva.charAt(3);
                this.m2 = this.fechaNueva.charAt(4);
                this.a = this.fechaNueva.substr(6, 10);
                console.log('dia: ' + this.d);
                console.log('mes: ' + this.m +''+this.m2);
                console.log('año: ' + this.a);
                this.newf = this.m + this.m2 +'/'+ this.d +'/'+ this.a;
                console.log('conversion: '+this.newf);
            }
            return this.newf;
        }
        
    },
    watch: {
        dataPeticion() {
            if (this.dataPeticion) {
                this.id = this.dataPeticion._id;
                this.fecha = this.dataPeticion.Fecha;
                this.detalle = this.dataPeticion.Detalle;
                this.productoId = this.dataPeticion.idProducto;
                this.cantidad = this.dataPeticion.Cantidad;
                this.idSucursalDestino = this.dataPeticion.idSucursal;
                this.estadoPeticion = this.dataPeticion.EstadoPeticion;
            }
        },
        productoId() {
            if (this.productoId) {
                for(let producto of this.dataProductos) {
                    if (producto._id == this.productoId) {
                        this.nombreProducto = producto.NombreProducto;
                        this.precio = producto.Precio_Unitario;
                        this.nombreProveedor = producto.Proveedor.Nombre;
                    }
                }
            }
        }
        
    }
}
</script>