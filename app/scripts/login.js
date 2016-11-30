const Login = {
  template: `

  <form class="login__form form container" @submit.prevent="loginUser">
    <label class="form__label">Your Email:</label>
    <input class="form__input" v-model="login">
      <label class="form__label">Your Password:</label>
      <input class="form__input" type="password" v-model="password">
        <button type="submit" class="button">Login</button>
      </form>
      `,

      created() {
        this.loginResource = this.$resource('login');

        //  this.loginUser();
      },

      data() {
        return {
          login: '',
          password: ''
        }
      },

      methods: {
        loginUser() {

          this.loginResource.save({}, {username: this.login, password: this.password})
          .then((response) => {
            console.log(response);

            bus.$emit('user-loggedin', {login: this.login});
            this.$router.push('/expenses');
          });
        }

      },


    };
