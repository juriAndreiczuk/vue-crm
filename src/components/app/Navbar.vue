<script setup>
import { useDateFilter } from '@/use/dateFilter'
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const date = ref(new Date())
const timer = ref(null)
const dropdown = ref(null)
const trigger = ref(null)
const list = ref(null)

const name = computed(() => store.getters.info.name)

const logout = async () => {
  await store.dispatch('logout')
  router.push('login?message=logout')
}

onMounted(() => {
  dropdown.value = M.Dropdown.init(trigger.value, list.value)
  timer.value = setInterval(() => {
    date.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  if (dropdown.value && dropdown.value.destroy) {
    dropdown.value.destroy()
  }
})
</script>

<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a 
          @click.prevent="$emit('buttonAction')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{useDateFilter(date, 'datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="trigger"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul 
            id="dropdown" 
            class="dropdown-content"
            ref="list"
          >
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Account
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a 
                href="#"
                class="black-text"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>Sign out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
