<template>
    <div class="content">
    <center>
    <div class="row">
      <div class="col-12">
                <br>
                <div class="card">
                    <div class="card-body">
                      <form @submit.prevent="enviar_form()">
                        <div class="form-row">
                                <!-- Columna izquierda -->
                                <div class="col-8">
                                    <!-- card de la izquierda -->
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <!-- Primera fila -->
                                            <div class="form-row">
                                                <!-- primera columna -->
                                                <div class="col">
                                                    <input v-model="nombre" type="text" class="form-control" placeholder="Nombre">
                                                </div>
                                                <!-- segunda columna -->
                                                <div class="col">
                                                    <input v-model.number="codigo" type="number" class="form-control" placeholder="Codigo">
                                                </div>
                                            </div>
                                            <br>
                                            <!-- segunda fila -->
                                            <div class="form-row">
                                                <!-- primera columna -->
                                                <div class="col">
                                                    <input v-model="telefono" type="text" class="form-control" placeholder="Telefono">
                                                </div>
                                                <!-- segunda columna -->
                                                <div class="col">
                                                    <input v-model="correo" type="email" class="form-control" placeholder="Correo">
                                                </div>
                                            </div>
                                            <br>

                                            <div class="card">
                                                <div class="card-header">
                                                Direccion
                                                </div>
                                                <div class="card-body">
                                                    <br>
                                                    <label for="check" class="mr-2">Cambiar departamento y municipio</label>
                                                    <input id="check" type="checkbox"  v-model="cambiarDireccion">
                                                    <br>
                                                    <div class="form-row" v-if="cambiarDireccion == false">
                                                        <div class="col">
                                                            <input v-model="departamento" type="text" class="form-control" disabled>
                                                        </div>
                                                        <div class="col">
                                                            <input v-model="municipio" type="text" class="form-control" disabled>
                                                        </div>
                                                    </div>

                                                    <div class="form-row" v-if="cambiarDireccion"> 
                                                        <div class="col">
                                                            <select class="form-control" id="selectDepartamento" @change="ShowSelected()">
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
                                            <input v-model.number="largo" type="number" class="form-control" placeholder="Largo de bodega" disabled>
                                            <br>
                                            <input v-model.number="ancho" type="number" class="form-control" placeholder="Ancho de bodega" disabled>
                                            <br>
                                            <input v-model.number="estanterias" type="number" class="form-control" placeholder="Estanterias" disabled>
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
    </center>
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
            numeroBodega: '',
            largo: '', 
            ancho: '',
            estanterias: '',
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
          this.largo = this.dataSucursal.Bodega[0].Largo;
          this.ancho = this.dataSucursal.Bodega[0].Ancho;
          this.estanterias = this.dataSucursal.Bodega[0].Estanterias;
          this.descripcion = this.dataSucursal.Contacto.Direccion.Descripcion;
          this.departamento = this.dataSucursal.Contacto.Direccion.Departamento;
          this.municipio = this.dataSucursal.Contacto.Direccion.Municipio;
          this.numeroBodega = this.dataSucursal.Bodega.NumeroBodega;
          
        }
      }
    },
    methods: {
        enviar_form(){

          if (this.nombre != '' && this.codigo != 0 && this.departamento != '' && this.municipio != '' && this.descripcion != '' && this.telefono != '' && this.correo != '' && this.largo != 0 && this.ancho != 0 && this.estanterias != 0) {
              

              axios.put('/Sucursales/actualizar',{
                  id : this.id, 
                  Nombre: this.nombre,
                  Codigo: this.codigo,
                  Departamento: this.departamento,
                  Municipio: this.municipio,
                  Descripcion: this.descripcion,
                  Telefono: this.telefono,
                  Correo: this.correo,
                  Largo: this.largo,
                  Ancho: this.ancho,
                  Estanterias: this.estanterias
                  //NumeroBodega: this.numeroBodega
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