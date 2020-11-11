<template>
  <div>
      <menuComponent></menuComponent>
      <Listado></Listado>
  </div>
</template>
<script>
import Listado from '@/components/Entradas/listarEntrada.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'EntradaL',
    components: {
        menuComponent,
        Listado
    }
}
</script>