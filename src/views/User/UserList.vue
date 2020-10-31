<template>
    <div>
        <menuComponent></menuComponent>
        <listar></listar>
    </div>
</template>

<script>

import menuComponent from '@/components/menus/menuComponent.vue'
import listar from '@/components/Users/listarUsuario.vue'

export default {
    name: 'UserList',
    components: {
        menuComponent,
        listar
    }
}
</script>

<style>

</style>