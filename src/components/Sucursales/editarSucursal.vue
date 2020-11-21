<template>
    <div class="row">
      <div class="col-12">
                <br>
                <div class="card">
                    <div class="card-body">
                      <form @submit.prevent="enviar_form()">
                        <div class="form-row">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <!-- Primera fila -->
                                            <div class="form-row">
                                                <!-- primera columna -->
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="nom">Nombre de Sucursal:</label>
                                                        <input v-model="nombre" type="text" class="form-control" id="nom" placeholder="Nombre">
                                                    </div>
                                                </div>
                                                <!-- segunda columna -->
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="cod">Codigo de sucursal:</label>
                                                        <input v-model.number="codigo" type="number" class="form-control" id="cod" placeholder="Codigo">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- segunda fila -->
                                            <div class="form-row">
                                                <!-- primera columna -->
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="tel">Telefono:</label>
                                                        <input v-model="telefono" type="text" class="form-control" id="tel" placeholder="Telefono">
                                                    </div>
                                                </div>
                                                <!-- segunda columna -->
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="cor">Correo:</label>
                                                        <input v-model="correo" type="email" class="form-control" id="cor" placeholder="Correo">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-header">
                                                    <center>Direccion</center>
                                                </div>
                                                <div class="card-body">
                                                    <input id="check" type="checkbox"  v-model="cambiarDireccion">
                                                    <label for="check" class="ml-2"> <small class="text-danger">Cambiar departamento y municipio</small></label>
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
                                                                <select class="form-control" id="selectDepartamento" @change="ShowSelected()">
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
                                                    <div class="form-group">
                                                        <label for="des">Descripcion:</label>
                                                        <textarea v-model="descripcion" type="text" class="form-control" id="des" placeholder="Descripcion" cols="30" rows="5"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Columna derecha -->
                                <div class="col-4">
                                    <!-- card de la derecha -->
                                    <div class="card h-100">
                                        <div class="card-header">
                                            <center>Bodega</center>
                                        </div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="lar">Largo:</label>
                                                <input v-model.number="largo" type="number" class="form-control" id="lar" placeholder="Largo de bodega" disabled>
                                            </div>                                           
                                            <br>
                                            <div class="form-group">
                                                <label for="anc">Ancho:</label>
                                                <input v-model.number="ancho" type="number" class="form-control" id="anc" placeholder="Ancho de bodega" disabled>
                                            </div>                                        
                                            <br>
                                            <div class="form-group">
                                                <label for="est">Numero de Estanterias:</label>
                                                <input v-model.number="estanterias" type="number" class="form-control" id="est" placeholder="Estanterias" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                      </form>
                      <br>
                      <center>
                        <div>
                          <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Actualizar</button>
                          <button  type="reset" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
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
    name: 'editarSucursal',
    props: {
        dataSucursal: { Object }
    },
    data() {
        return{
            id: '',
            nombre: '',
            codigo: '',
            departamento: '',
            municipio: '',
            descripcion: '',
            telefono: '',
            correo: '',
            data: [],
            indiceDepartamento: 0,
            municipiosArray: [],
            cambiarDireccion: false
        };
    },
    mounted() {
      this.dataList();
    },
    watch: {
      dataSucursal() {
        if(this.dataSucursal) {
          this.id = this.dataSucursal._id;
          this.nombre = this.dataSucursal.Nombre;
          this.codigo = this.dataSucursal.Codigo;
          this.telefono = this.dataSucursal.Contacto.Telefono;
          this.correo = this.dataSucursal.Contacto.Correo;
          this.descripcion = this.dataSucursal.Contacto.Direccion.Descripcion;
          this.departamento = this.dataSucursal.Contacto.Direccion.Departamento;
          this.municipio = this.dataSucursal.Contacto.Direccion.Municipio;
          
        }
      }
    },
    methods: {
        enviar_form(){

          if (this.nombre != '' && this.codigo != 0 && this.departamento != '' && this.municipio != '' && this.descripcion != '' && this.telefono != '' && this.correo != '') {
              

              axios.put('/Sucursales/actualizar',{
                  id : this.id, 
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
                  location.reload();

              })
              .catch(
                  error => console.log(error)
              );
          }else{
              Swal.fire({
                  title: 'Mensaje',
                  icon: 'info',
                  text: 'Campos vacios, todos los campos son requeridos'
                  });
          }
        },
        cancelar() {
            this.cambiarDireccion = false;
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
        dataList() {
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

</style>