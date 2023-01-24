<script setup>
import AuthLayout from './layouts/AuthLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import { computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute() 
const layout = computed(() => 
  route.meta.layout === 'auth-layout' ?
    markRaw(AuthLayout) : markRaw(MainLayout)
)
</script>

<template>  
  <component :is="layout">
    <router-view />
  </component>
</template>

<style lang="scss">
 @import '~materialize-css/dist/css/materialize.min.css';
 @import 'assets/index.css';
</style>