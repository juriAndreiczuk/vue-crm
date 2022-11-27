<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>


<script>
  export default {
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
    }
  }
</script>