import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export const useError = () => {
  const store = useStore()
  const error = computed(() => store.getters.error) 

  watch(error, e => {
    if(e && e.message) {
      M.toast({html: `${e.message}`})   
    }
    store.commit('clearError')
  })
}