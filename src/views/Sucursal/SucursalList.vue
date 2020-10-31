<template>
  <div>
      <menuComponent></menuComponent>
      <Listado></Listado>
  </div>
</template>
<script>
import Listado from '@/components/Sucursales/listarSucursal.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'SucursalL',
    components: {
        menuComponent,
        Listado
    }


}
</script>