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
      login: ''
    }
  },

  created() {
    bus.$on('user-loggedin', (data) => {
      this.login = data.login;
    });

    this.logoutResource = this.$resource('api/logout');
    if (localStorage.login && localStorage.token) {
      Vue.http.headers.common['Authorization'] = localStorage.token;
      bus.$emit('user-loggedin', {login: localStorage.login});
    }

  },

  methods: {
    logoutUser() {
      this.logoutResource.save({}, {token: localStorage.token})
      .then((response) => {
        delete Vue.http.headers.common['Authorization'];
        this.login = '';
        bus.$emit('user-loggedout');
        console.log("logout!");
        this.$router.push('/');
        localStorage.removeItem("login");
        localStorage.removeItem("token");

      }).catch((error) => {
        console.log(error);
      })
    }
  }
});
