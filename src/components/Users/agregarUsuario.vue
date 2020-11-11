<template>
    <div class="content">
        <center>
            <div class="row">
                <div class="col-12">
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <form @submit="enviar_form()">
                                <div class="form-row">
                                    <div class="col">
                                        <input v-model="nombres" type="text" class="form-control"  placeholder="Nombres">
                                    </div>
                                    <div class="col">
                                        <input v-model="apellidos" type="text" class="form-control"  placeholder="Apellidos">
                                    </div>
                                    <div class="col">
                                        <input v-model="correo" type="email" class="form-control"  placeholder="Correo electronico">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row"> 
                                    <div class="col">
                                    <input v-model="dui" type="text" class="form-control" placeholder="DUI">
                                    </div>
                                    <div class="col">
                                    <input v-model="nit" type="text" class="form-control" placeholder="NIT">
                                    </div>
                                    <div class="col">
                                        <input v-model="telefono" type="text" class="form-control" placeholder="telefono">
                                    </div>  
                                </div>
                                <br>
                                <div class="form-row"> 
                                    <div class="col">
                                    <input v-model="fechaNacimiento" type="date" class="form-control" placeholder="Fecha de Nacimiento">
                                    </div>
                                    <div class="col">
                                        <select v-model="numero" class="form-control" id="selectEstadoCivil" @change="ShowSelected3()">
                                            <option value="0">-Estado Civil-</option>
                                            <option value="1">Soltero</option>
                                            <option value="2">Casado</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col">
                                        <select class="form-control" v-model="numeronivel" id="selectNivel" @change="ShowSelected()">
                                            <option value="0" selected="selected">-Nivel-</option>
                                            <option v-for="(item, index) in dataNivel" :value="item.NumeroNivel" :key="index">{{item.TipoNivel}}</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-control" v-model="idSucursal" id="selectSucursal">
                                            <option value="0" selected="selected">-Sucursal-</option>
                                            <option v-for="(item, index) in dataSucursal" :value="item._id" :key="index">{{item.Nombre}}</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <div class="card">
                                    <div class="card-header">
                                    Direccion
                                    </div>
                                    <div class="card-body">
                                        <br>
                                        <div class="form-row"> 
                                            <div class="col">
                                                <select class="form-control" id="selectDepartamento" @change="ShowSelected2()">
                                                <option value="Departamento" selected="selected">-Departamento-</option>
                                                <option v-for="(item, index) in data" :value="index" :key="index">{{item.Departamento}}</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <select v-model="municipio" class="form-control">
                                                <option value="0" selected="selected">-Municipio-</option>
                                                <option v-for="(item, index) in municipiosArray" :key="index" >{{item}}</option>
                                                </select>
                                            </div>                                      
                                        </div>
                                        <br>
                                        <div class="form-row">
                                            <div class="col"> 
                                                <div class="col">
                                                    <input v-model="descripcion" type="text" class="form-control" placeholder="Descripcion">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br>
                            <center>
                                <div>
                                    <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Enviar</button>
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
    name: 'agregarUsuario',
    data() {
        return {
            nombres: '',
            apellidos: '',
            correo: '',
            dui: '',
            nit: '',
            telefono: '',
            fechaNacimiento: '',
            //estado civil
            tipo: '',               //estadoCivil
            numero: 0,              //numeroEstadoCivil
            //nivel usuario
            dataNivel: [],
            indiceNivel: 0,
            //nivelesArray: [],
            tiponivel: '',
            numeronivel: 0,
            //sucursal
            dataSucursal: [],
            indiceSucursal: 0,
            sucursalesArray: [],
            idSucursal: 0,
            //direccion
            data: [],
            indiceDepartamento: 0,
            municipiosArray : [],
            departamento: '',
            municipio: 0,
            descripcion: ''
        }
    },
    mounted(){
        this.dataLevels();
        this.dataSucurs();
        this.dataProvider();
    },
    methods: {
        enviar_form() {
            if (this.nombres != '' && this.apellidos != '' && this.correo != '' && this.dui != '' && this.nit != '' && this.telefono != '' && this.fechaNacimiento != '' && this.numero != 0 && this.numeronivel != 0 && this.idSucursal != 0 && this.descripcion != '' && this.departamento != '' && this.municipio != 0 && this.descripcion != '') {            
                axios.post('/Usuarios/crear',{
                    Nombres : this.nombres,
                    Apellidos: this.apellidos,
                    Fecha_Nacimiento: this.fechaNacimiento,
                    DUI: this.dui,
                    NIT: this.nit,
                    Tipo: this.tipo,                        //estadoCivil
                    Numero: this.numero,                    //numeroEstadoCivil
                    Departamento : this.departamento,
                    Municipio : this.municipio,
                    Descripcion : this.descripcion,
                    Correo : this.correo,
                    Telefono : this.telefono,
                    idSucursal: this.idSucursal,            //idSucursal
                    NombreUsuario: this.nombres,
                    Password: 123,
                    TipoNivel: this.tiponivel,              //tipoNivel
                    NumeroNivel: this.numeronivel           //numeroNivel
            })
            .then(response => {                 
                //console.log(response.data.mensaje);                 
                Swal.fire({
                    title: 'Mensaje',
                    icon: 'success',
                    text: response.data.mensaje
                    });
                    this.limpiar_form();
                    location.reload();
            })
            .catch(
                error => console.log(error)
            )
        }
            else{
                Swal.fire({
                    title: 'Campos vacios',
                    icon: 'info',
                    text: 'Todos los campos son requeridos.'
                });
            } 
        },
        limpiar_form() {
            this.nombres = '',
            this.apellidos = '',
            this.correo = '',
            this.dui = '',
            this.nit = '',
            this.telefono = '',
            this.fechaNacimiento = '',
            this.departamento = ''
            this.municipio = 0,
            this.descripcion = '',
            
            //select de estado civil
            this.numero = 0,

            //select de nivel de usuario
            this.numeronivel = 0,

            //select de sucursal
            this.idSucursal = 0
        },

        //METODOS DE NIVELES
        ShowSelected() {
            /* Para obtener el valor id*/
            var indice = document.getElementById("selectNivel").value;
            this.numeronivel = indice;
            /* Para obtener el texto */
            var combo = document.getElementById("selectNivel");
            var selected = combo.options[combo.selectedIndex].text;      
            this.tiponivel = selected;
        },
        dataLevels() {
            axios.get('/Niveles/listar')
            .then(response => {
                this.dataNivel = response.data;
                console.log(this.dataNivel);
            })
            .catch(
                 error => console.log(error)
            )
        },

        //METODOS DE SUCURSALES
        ShowSelected1() {
            /* Para obtener el valor id*/
            var a = document.getElementById("selectSucursal").value;
            this.indiceSucursal = a;
            this.sucursalesArray = this.data[this.indiceSucursal].Nombre
            /* Para obtener el texto */
            var combo = document.getElementById("selectSucursal");
            var selected = combo.options[combo.selectedIndex].text;      
            this.codigo = selected;
        },
        dataSucurs() {
            axios.get('/Sucursales/listar')
            .then(response => {
                this.dataSucursal = response.data;
                console.log(this.dataSucursal);
            })
            .catch(
                 error => console.log(error)
            )
        },

        //METODOS DE DIRECCIONES
        ShowSelected2() {
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
        },

        //ESTADO CIVIL
        ShowSelected3() {
            /* Para obtener el valor*/
            var k = document.getElementById("selectEstadoCivil").value;
            this.numero = k;
            /* Para obtener el texto */
            var combo = document.getElementById("selectEstadoCivil");
            var selected = combo.options[combo.selectedIndex].text;      
            this.tipo = selected;
        }
    }
}
</script>