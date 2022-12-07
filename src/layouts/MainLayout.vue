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

<script>
  import Navbar from '@/components/app/Navbar';
  import Sidebar from '@/components/app/Sidebar';

  export default {
    name: 'main-layout',
    data() {
      return {
        isOpen: true
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
    },
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(e) {
        if(e && e.message) {
          this.$error(e.message)
        }
        this.$store.commit('clearError')
      }
    },
    components: {
      Navbar,
      Sidebar
    }
  }
</script>