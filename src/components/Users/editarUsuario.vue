<template>
    <div class="row">
      <div class="col-12">
        <div class="card">
            <div class="card-body">
              <form @submit.prevent="enviar_form()">
                  <div class="form-row">
                      <div class="col">
                          <div class="form-group">
                              <label for="nom">Nombre:</label>
                              <input v-model="nombres" type="text" class="form-control" id="nom" placeholder="Nombres">
                          </div>
                      </div>
                      <div class="col">
                          <div class="form-group">
                              <label for="ape">Apellido:</label>
                              <input v-model="apellidos" type="text" class="form-control" id="ape" placeholder="Apellidos">
                          </div>
                      </div>
                      <div class="col">
                          <div class="form-group">
                              <label for="cor">Correo:</label>
                              <input v-model="correo" type="email" class="form-control" id="cor" placeholder="Correo electronico">
                          </div>
                      </div>
                  </div>
                  <div class="form-row"> 
                      <div class="col">
                          <div class="form-group">
                              <label for="du">DUI:</label>
                              <input v-model="dui" type="text" class="form-control" id="du" placeholder="DUI">
                          </div>
                      </div>
                      <div class="col">
                          <div class="form-group">
                              <label for="ni">NIT:</label>
                              <input v-model="nit" type="text" class="form-control" id="ni" placeholder="NIT">
                          </div>
                      </div>
                      <div class="col">
                          <div class="form-group">
                              <label for="tel">Teléfono:</label>
                              <input v-model="telefono" type="text" class="form-control" id="tel" placeholder="telefono">
                          </div>
                      </div>  
                  </div>
                  <div class="form-row">
                                    <div class="col">
                                        <label for="uss">Usuario:</label>
                                        <input v-model="obtenerUsuario" type="text" class="form-control" disabled="disabled">
                                    </div>
                                    <div class="col">
                                        <label for="pas">Password:</label>
                                        <input v-model="convertirFechaNacimiento" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <br>
                  <div class="form-row"> 
                      <div class="col">
                          <div class="form-group">
                              <label for="fec">Fecha de nacimiento:</label>
                              <input v-model="fechaNacimiento" type="date" class="form-control" id="fec" placeholder="Fecha de Nacimiento">
                          </div>
                      </div>
                  </div>
                    <div class="form-row">
                        <div class="col-6">
                            <div v-if="cambiarEstadoCivil == false">
                                <div class="form-group">
                                    <label for="civ">Estado civil:</label>
                                    <input type="text" v-model="tipo" class="form-control" id="civ" disabled="disabled">
                                </div>
                            </div>
                            <div v-if="cambiarEstadoCivil">
                                <div class="form-group">
                                    <label>Estado civil:</label>
                                    <select v-model="numero" class="form-control" id="selectEstadoCivil" @change="ShowSelected3()">
                                    <option value="0">-Estado Civil-</option>
                                    <option value="1">Soltero</option>
                                    <option value="2">Casado</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">

                        </div>
                        <div class="col text-left">
                            <input type="checkbox" class="form-check-input" v-model="cambiarEstadoCivil" id="checkEC">
                            <label for="checkEC"><small class="text-danger">Cambiar Estado Civil</small></label>
                        </div>
                    </div>
                    <br>
                    <div class="form-row">
                        <div class="col-6">
                            <div v-if="cambiarNivel == false">
                                <div class="form-group">
                                    <label for="niv">Nivel de usuario:</label>
                                    <input type="text" v-model="tiponivel" class="form-control" id="niv" disabled="disable">
                                </div>
                            </div>
                            <div v-if="cambiarNivel">
                                <div class="form-group">
                                    <label>Nivel de usuario:</label>
                                    <select class="form-control" v-model="numeronivel" id="selectNivel" @change="ShowSelected()">
                                    <option value="TipoNivel" selected="selected">-Nivel-</option>
                                    <option v-for="(item, index) in dataNivel" :value="item.NumeroNivel" :key="index">{{item.TipoNivel}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">

                        </div>
                        <div class="col text-left">
                            <input type="checkbox" class="form-check-input" v-model="cambiarNivel" id="checkN">
                            <label for="checkN"><small class="text-danger">Cambiar Nivel de usuario</small></label>
                        </div>
                    </div>
                <br>
                <div class="form-row">
                    <div class="col-6">
                        <div v-if="cambiarSucursal == false">
                            <div class="form-group">
                                <label for="suc">Sucursal:</label>
                                <input type="text" v-model="nombreSucursal" class="form-control" id="suc" disabled="disabled">
                            </div>
                        </div>
                        <div v-if="cambiarSucursal">
                            <div class="form-group">
                                <label>Sucursal:</label>
                                <select class="form-control" v-model="idSucursal" id="selectSucursal" @change="ShowSelected1()">
                                    <option value="Nombre" selected="selected">-Sucursal-</option>
                                    <option v-for="(item, index) in dataSucursal" :value="item._id" :key="index">{{item.Nombre}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-1">

                    </div>
                    <div class="col text-left">
                        <input type="checkbox" class="form-check-input" v-model="cambiarSucursal" id="checkS">
                        <label for="checkS"><small class="text-danger">Cambiar Sucursal</small></label>
                    </div>
                </div>
                  <br>
                  <div class="card">
                      <div class="card-header">
                      Dirección
                      </div>
                      <div class="card-body">                           
                            <div class="form-row" v-if="cambiarDireccion == false">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="dep">Departamento:</label>
                                        <input v-model="departamento" type="text" class="form-control" id="dep" disabled>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="mun">Municipio:</label>
                                        <input v-model="municipio" type="text" class="form-control" id="mun" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row" v-if="cambiarDireccion"> 
                                <div class="col">
                                    <div class="form-group">
                                        <label>Departamento:</label>
                                        <select class="form-control" id="selectDepartamento" @change="ShowSelected2()">
                                            <option value="Departamento" selected="selected">-Departamento-</option>
                                            <option v-for="(item, index) in data" :value="index" :key="index">{{item.Departamento}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label>Municipio:</label>
                                        <select v-model="municipio" class="form-control">
                                            <option value="0" selected="selected">-Municipio-</option>
                                            <option v-for="(item, index) in municipiosArray" :key="index" >{{item}}</option>
                                        </select>
                                    </div>
                                </div>                                      
                            </div>
                                <label for="check" class="mr-2"><small class="text-danger">Cambiar departamento y municipio</small></label>
                                <input id="check" type="checkbox"  v-model="cambiarDireccion">
                            <div class="form-row">
                                <div class="col"> 
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="des">Descripción:</label>
                                            <input v-model="descripcion" type="text" class="form-control" id="des" placeholder="Descripcion">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                  </div>
              </form>
              <br>
              <center>
                  <div>
                      <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Actualizar</button>
                      <button v-on:click="cancelar()" type="reset" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                  </div>
              </center>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import vuex from 'vuex'
import router from 'vue-router'
import axios from '../../config/axios'

export default {
    name: 'editarUsuario',
    props: {
        dataUsuario: { Object }
    },
    data() {
        return{
            id: '',
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
            sucursalesArray: [], //sirve para encontrar el nombre de dicha sucursal a editar
            nombreSucursal: '',
            idSucursal: 0,
            //direccion
            data: [],
            indiceDepartamento: 0,
            municipiosArray : [],
            departamento: '',
            municipio: 0,
            descripcion: '',
            cambiarDireccion: false,

            cambiarEstadoCivil: false,
            cambiarNivel: false,
            cambiarSucursal: false,

            //recuperando user y password
            pass: '',
            //variables para convertir la fecha nacimiento en password
            fechaNueva: '',
            d: '',
            m: '',
            m2: '',
            a: '',
            //capturando el usuario
            usuario: '',
            user: ''
        }
    },
    mounted(){
        this.dataLevels();
        this.dataSucurs();
        this.dataProvider();
        this.obtenerNombreSucursal();
    },
    watch: {
        dataUsuario() {
        if(this.dataUsuario) {
            this.id = this.dataUsuario._id;
            this.nombres = this.dataUsuario.personal.Nombres;
            this.apellidos = this.dataUsuario.personal.Apellidos;
            this.correo = this.dataUsuario.personal.Contacto.Correo;
            this.dui = this.dataUsuario.personal.DUI;
            this.nit = this.dataUsuario.personal.NIT;
            this.telefono = this.dataUsuario.personal.Contacto.Telefono;
            this.fechaNacimiento = this.dataUsuario.personal.Fecha_Nacimiento;
            this.tipo = this.dataUsuario.personal.Estado_Civil.Tipo;
            this.numero = this.dataUsuario.personal.Estado_Civil.Numero;

            this.tiponivel = this.dataUsuario.nivel.TipoNivel;
            this.numeronivel = this.dataUsuario.nivel.NumeroNivel;

            this.idSucursal = this.dataUsuario.personal.idSucursal;
            this.obtenerNombreSucursal();

            this.descripcion = this.dataUsuario.personal.Contacto.Direccion.Descripcion;
            this.departamento = this.dataUsuario.personal.Contacto.Direccion.Departamento;
            this.municipio = this.dataUsuario.personal.Contacto.Direccion.Municipio;

            this.user = this.dataUsuario.usuario;
            this.pass = this.dataUsuario.password;
        }
      }
    },
    methods: {
        enviar_form() {
            if (this.nombres != '' && this.apellidos != '' && this.correo != '' && this.dui != '' && this.nit != '' 
                && this.telefono != '' && this.fechaNacimiento != '' && this.numero != 0 && this.numeronivel != 0 
                && this.idSucursal != 0 && this.descripcion != '' && this.departamento != '' && this.municipio != 0 
                && this.descripcion != '' && this.user != '' && this.pass != '') {            
                axios.put('/Usuarios/actualizar',{
                    id : this.id,
                    Nombres: this.nombres,
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
                    usuario: this.user,
                    password: this.pass,
                    TipoNivel: this.tiponivel,              //tipoNivel
                    NumeroNivel: this.numeronivel           //numeroNivel
            })
            .then((response) => {                 
                //console.log(response.data.mensaje);                 
                Swal.fire({
                    title: 'Mensaje',
                    icon: 'success',
                    text: response.data.mensaje
                    });
                    location.reload();
            })
            .catch((error) => console.log(error));
            }
            else{
                Swal.fire({
                    title: 'Campos vacios',
                    icon: 'info',
                    text: 'Todos los campos son requeridos.'
                });
            } 
        },
        cancelar() {
            this.cambiarDireccion = false;
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
            this.nombreSucursal = selected;
        },
        dataSucurs() {
            axios.get('/Sucursales/listar')
            .then(response => {
                this.dataSucursal = response.data;
                this.sucursalesArray = response.data;
                console.log(this.dataSucursal);
            })
            .catch(
                 error => console.log(error)
            )
        },
        obtenerNombreSucursal(){
            axios.get(`/Sucursales/buscar/${this.idSucursal}`)
            .then(response => {
                this.nombreSucursal = response.data.Nombre;
                console.log(response.data.Nombre);
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
    },
    computed: {
        convertirFechaNacimiento() {
            this.fechaNueva = '';
            if(this.fechaNacimiento != ''){
                this.fechaNueva = this.fechaNacimiento;
                this.fechaNueva.toLocaleString();

                //this.fechaNueva = this.fechaNueva.replace(/[-]/g, '');
                this.d = this.fechaNueva.substr(8, 10);
                this.m = this.fechaNueva.charAt(5);
                this.m2 = this.fechaNueva.charAt(6);
                this.a = this.fechaNueva.substr(0, 4);
                console.log('dia: ' + this.d);
                console.log('mes: ' + this.m +''+this.m2);
                console.log('año: ' + this.a);

                this.pass = this.d + this.m + this.m2 + this.a;
                console.log('pass: '+this.pass);
            }
            return this.pass;
        },
        obtenerUsuario(){
            this.usuario = '';
            if(this.nombres != ''){
                this.usuario = this.nombres + this.apellidos;
                this.user = this.usuario;
                console.log('user: '+this.user);
            }
            return this.user;
        }   
    }
}
</script>

<style>

</style>