<template>
  <div>
      <menuComponent></menuComponent>
      <ListadoP v-if="comprobar"></ListadoP>
      <ListadoN v-if="comprobar == false"></ListadoN>
  </div>
</template>
<script>
import ListadoP from '@/components/Productos/listarProducto.vue'
import ListadoN from '@/components/ProductoSucursales/listarProducto.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'ProductoL',
    components: {
        menuComponent,
        ListadoP,
        ListadoN
    },
    data(){
        return {
            sucursal: sessionStorage.getItem('nomSucursal'),
            comprobar: false
        }
    },
    mounted() {
        this.EsPrincipal();
    },
    methods: {
        EsPrincipal(){
            if (this.sucursal == 'Sucursal Principal') {
                this.comprobar = true;
            } else {
                this.comprobar = false;
            }   
        }
    }
}
</script>