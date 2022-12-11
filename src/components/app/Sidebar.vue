<template>
  <ul class="sidenav app-sidenav" :class="{ open: !modelValue }">
    <template v-for="route of $router.options.routes">
      <li
        :key="route.name"
        :class="{ active: route.path === $route.fullPath }"
        v-if="route.meta.sidebar"
      >
        <router-link :to="route.path" class="waves-effect waves-orange pointer">
          {{ localizeFilter(route.name) }}
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>
import localize from '@/mixins/localize'
export default {
  props: ['modelValue'],
  mixins: [localize]
}
</script>