<template>
  <div class="app-main-layout">
    <Navbar @buttonAction="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" />
    <main
      class="app-content"
      :class="{'full' : isOpen}"
    >
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link 
        v-tooltip="'create new record'"
        class="btn-floating btn-large blue" 
        to="/record"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useError } from '@/use/error'
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import { useStore } from 'vuex'

const store = useStore()

const isOpen = ref(true)

useError()

onMounted(async () => {
  if (!Object.keys(store.getters.info).length) {
    await store.dispatch('fetchInfo')
  }
})
</script>