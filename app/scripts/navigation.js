Vue.component('navigation', {
  template: `
  <nav class="navigation">
    <a href="/" class="navigation__logo">App</a>
    <ul class="navigation__list">
      <li class="navigation__list-item">
        <router-link to="/" class="navigation__list-link">Home</router-link>
      </li>

      <li class="navigation__list-item">
        <router-link v-if="login" to="/expenses" class="navigation__list-link">Your Expenses</router-link>
      </li>

      <li class="navigation__list-item">
        <router-link v-if="login" to="/statistics" class="navigation__list-link">Stats</router-link>
      </li>

      <li class="navigation__list-item">
        <router-link v-if="login" to="/profile" class="navigation__list-link">Profile</router-link>
      </li>

      <li class="navigation__list-item">
        <a v-if="login" href="/home" class="navigation__list-link" @click.prevent="logoutUser">Log Out</a>
        <router-link v-else to="/login" class="navigation__list-link">Log In</router-link>
      </li>
    </ul>
  </nav>`,

  data() {
    return {
      login: User.getLogin()
    };
  },

  created() {
    bus.$on('user-loggedin', () => {
      this.login = User.getLogin();
    });

    this.logoutResource = this.$resource('api/logout');
  },

  methods: {
    logoutUser() {
      this.logoutResource.save({}, {token: User.getToken()})
      .then((response) => {
        this.login = '';
        console.log("logout!");
        User.logout();
        this.$router.push('/');
      }).catch((error) => {
        console.log(error);
      });
    }
  }
});
