const Login = {
  template: `

  <div class="login-register">
    <div class="tabs tab-nav">
      <ul>
        <li :class="{'is-active': visible==='login'}" class="" @click.prevent="visible='login'"><a>Login</a></li>
        <li :class="{'is-active': visible==='register'}" class="" @click.prevent="visible='register'"><a>Register</a></li>
      </ul>
    </div>

    <div v-show="visible === 'login'">
      <form class="login__form form container" @submit.prevent="loginUser">
        <label class="label" >Email</label>
        <p class="control has-icon">
          <input class="input" v-model="login" type="email" placeholder="Your Email" required>
            <i class="fa fa-envelope"></i>
          </p>
          <label class="label">Password</label>
          <p class="control has-icon">
            <input class="input" type="password" placeholder="Password" v-model="password">
              <i class="fa fa-lock"></i>
            </p>

            <button type="submit" class="button is-primary">Login</button>
          </form>
        </div>

        <div v-show="visible === 'register'">
          <register-form></register-form>
        </div>
      </div>
      `,

      created() {
        this.loginResource = this.$resource('api/login');
      },

      data() {
        return {
          visible: 'login',
          login: '',
          password: ''
        }
      },

      methods: {
        loginUser() {
          this.loginResource.save({}, {login: this.login, password: this.password})
          .then((response) => {
            response.json().then((json) => {
              Vue.http.headers.common['Authorization'] = json.token;
              localStorage.setItem("login", this.login);
              localStorage.setItem("token", json.token);

              bus.$emit('user-loggedin', {login: this.login});
              this.$router.push('/expenses');

              console.log(localStorage.login, localStorage.token);
            })
          });
        },
      },
    };
