<template>
  <div>
      <menuComponent></menuComponent>
      <Listado></Listado>
  </div>
</template>
<script>
import Listado from '@/components/Productos/listarProducto.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'ProductoL',
    components: {
        menuComponent,
        Listado
    }


}
</script>