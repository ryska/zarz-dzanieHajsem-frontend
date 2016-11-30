Vue.component('navigation', {
  template: `
  <nav class="navigation">
    <a href="/" class="navigation__logo">App</a>
    <ul class="navigation__list">
      <li class="navigation__list-item">
        <router-link to="/" class="navigation__list-link">Home</router-link>
      </li>

      <li class="navigation__list-item">
        <router-link to="/expenses" class="navigation__list-link">Your Expenses</router-link>
      </li>

      <li class="navigation__list-item">
        <a v-if="login" href="/home" class="navigation__list-link" @click.prevent="">Log Out</a>
        <router-link v-else to="/login" class="navigation__list-link">Log In</router-link>
      </li>

      <li class="navigation__list-item">
        <a href="#" class="navigation__list-link">Help</a>
      </li>
    </ul>
  </nav>`,

  data() {
    return {
      login: ''
    }
  },

  created() {
    bus.$on('user-loggedin', (data) => {
      this.login = data.login;
    });

    this.logoutResource = this.$resource('logout');

  },

  methods: {
    logoutUser() {
      this.logoutResource.save()
        .then((response) => {
          bus.$emit('user-loggedin', {login: this.login});
        });
    }
  }
});
