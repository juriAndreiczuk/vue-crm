<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a 
          href="#" 
          @click.prevent="$emit('buttonAction')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{dateFilter(date, 'datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="trigger"
          >
            USER NAME
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

<script>
import dateFilter from '@/mixins/dateFilter'

export default {
  mixins: [dateFilter],
  data() {
    return {
      date: new Date(),
      timer: null,
      dropdown: null
    }
  },
  methods: {
    logout() {
      this.$router.push('login?message=logout')
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.trigger, this.$refs.list),
    this.timer = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
