Vue.component('register-form', {
  template: `
  <form class="login__form form container" @submit.prevent="registerUser">
    <label class="label" >Email</label>
    <p class="control  has-icon">
      <input class="input" v-model="login" type="email" placeholder="Your Email" required>
        <i class="fa fa-envelope"></i>
      </p>
      <label class="label" >Password</label>
      <p class="control has-icon">
        <input class="input" type="password" placeholder="Password" v-model="password">
          <i class="fa fa-lock"></i>
        </p>

        <p class="control">
          <label class="checkbox">
            <input type="checkbox" v-model="report">
              I want to receive reminder emails
            </label>
          </p>
          <button type="submit" class="button is-primary">Sign Up</button>
        </form>
        `,

        created() {
          this.registerResource = this.$resource('api/user/register');
        },

        data() {
          return {
            login: '',
            password: '',
            report: ''
          }
        },

        methods: {
          registerUser() {
            this.registerResource.save({}, {login: this.login, password: this.password, report: this.report})
            .then((response) => {
              alert('Yay! You are succesfully registered!');
            });
          }
        }

      });
