<template>
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <form @submit="enviar_form()">
                            <div class="form-row">
                                    <!-- card de la izquierda -->
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <!-- Primera fila -->
                                            <div class="form-row">
                                                <!-- primera columna -->
                                                <div class="col">
                                                    <div class="form-row">
                                                        <label class="text-left">Nombre:</label>
                                                    </div>
                                                    <input v-model="nombre" type="text" class="form-control">
                                                </div>
                                                <!-- segunda columna -->
                                                <div class="col">
                                                    <div class="form-row">
                                                        <label class="text-left">Código:</label>
                                                    </div>
                                                    <input v-model.number="codigo" type="number" class="form-control">
                                                </div>
                                            </div>
                                            <br>
                                            <!-- segunda fila -->
                                            <div class="form-row">
                                                <!-- primera columna -->
                                                <div class="col">
                                                    <div class="form-row">
                                                        <label class="text-left">Teléfono:</label>
                                                    </div>
                                                    <input v-model="telefono" type="text" class="form-control">
                                                </div>
                                                <!-- segunda columna -->
                                                <div class="col">
                                                    <div class="form-row">
                                                        <label class="text-left">Correo:</label>
                                                    </div>
                                                    <input v-model="correo" type="email" class="form-control">
                                                </div>
                                            </div>
                                            <br>

                                            <div class="card">
                                                <div class="card-header">
                                                    <center>Dirección</center>
                                                </div>
                                                <div class="card-body">
                                                    <!-- primera fila -->
                                                    <div class="form-row">
                                                        <!-- primera columna -->
                                                        <div class="col">
                                                            <div class="form-row">
                                                                <label class="text-left">Departamento:</label>
                                                            </div>
                                                            <select class="form-control" id="selectDepartamento" @change="ShowSelected()">
                                                                <option value="Departamento" selected="selected">-Departamento-</option>
                                                                <option v-for="(item, index) in data" :value="index" :key="index">{{item.Departamento}}</option>
                                                            </select>
                                                        </div>
                                                        <!-- segunda columna -->
                                                        <div class="col">
                                                            <div class="form-row">
                                                                <label class="text-left">Municipio:</label>
                                                            </div>
                                                            <select v-model="municipio" class="form-control">
                                                                <option value="0" selected="selected">-Municipio-</option>
                                                                <option v-for="(item, index) in municipiosArray" :key="index" >{{item}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <div class="form-row">
                                                        <label class="text-left">Descripción:</label>
                                                    </div>
                                                    <input v-model="descripcion" type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <br>
                            <!-- botonera -->
                            <center>
                                <div>
                                <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mx-4" data-dismiss="modal">Agregar</button>
                                <button v-on:click="limpiar_form()" type="submit" class="btn btn-danger mx-4" data-dismiss="modal">Cancelar</button>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

export default {
    name: 'agregarSucursal',
    data() {
        return{
            nombre: '',
            codigo: '',
            departamento: '',
            municipio: 0,
            descripcion: '',
            telefono: '',
            correo: '',
            data: [],
            indiceDepartamento: 0,
            municipiosArray: []
        }
    },
    mounted() {
        this.dataProvider();
    },
    methods: {
        enviar_form() {
            if (this.nombre != '' && this.codigo != 0 && this.departamento != '' && this.municipio != '' && this.descripcion != '' && this.telefono != '' && this.correo != '') {
                axios.post('/Sucursales/crear',{
                    Nombre: this.nombre,
                    Codigo: this.codigo,
                    Departamento: this.departamento,
                    Municipio: this.municipio,
                    Descripcion: this.descripcion,
                    Telefono: this.telefono,
                    Correo: this.correo,
                })
                .then(response => {
                    console.log(response.data.mensaje);

                    Swal.fire({
                    title: 'Mensaje',
                    icon: 'success',
                    text: response.data.mensaje
                    });
                    this.limpiar_form()
                    location.reload()
                    setTimeout( function() {
                        location.reload();
                    }, 2000);
                })
                .catch(
                    error => console.log(error)
                )
            } 
            else {
                Swal.fire({
                  title: 'Campos vacios',
                  icon: 'info',
                  text: 'Todos los campos son requeridos.'
              });
            }
        },
        limpiar_form() {
            this.nombre = '';
            this.codigo = '';
            this.departamento = '';
            this.municipio = 0;
            this.descripcion = '';
            this.telefono = '';
            this.correo = '';
        },
        ShowSelected() {
        /* Para obtener el valor id para el selectbox de municipios*/
        var cod = document.getElementById("selectDepartamento").value;
        this.indiceDepartamento = cod;
        this.municipiosArray = this.data[this.indiceDepartamento].Municipios
        /* Para obtener el texto */
        var combo = document.getElementById("selectDepartamento");
        var selected = combo.options[combo.selectedIndex].text;      
        this.departamento = selected;
        },
        dataProvider() {
            axios.get('/Departamentos/listar')
            .then(response => {
                this.data = response.data;
                console.log(this.data);
            })
            .catch(
                error => console.log(error)
            )
        }
    }
}
</script>

<style>
.content{
    widows: 100;
    height: 100;
}
</style>