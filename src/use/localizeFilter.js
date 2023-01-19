import pl from '../locales/pl.json'
import en from '../locales/en.json'
import { reactive } from 'vue'
import { useStore } from 'vuex'
export const useLocalizeFilter = (key) => {
  const store = useStore()

  const locales = reactive({
    'pl-PL' : pl,
    'en-EN' : en
  })
  
  return locales[store.getters.info.locale][key] || `[Lokalize error: key: ${key} not founded]`
}