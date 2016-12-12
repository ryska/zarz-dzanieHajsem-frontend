Vue.component('change-password', {
  template: `
  <form class="login__form form" @submit.prevent="changePassword">
    <label class="label">Old Password</label>
    <p class="control has-icon">
      <input class="input" type="password" placeholder="Password" v-model="password">
        <i class="fa fa-lock"></i>
      </p>
      <label class="label">New Password</label>
      <p class="control has-icon">
        <input class="input" type="password" placeholder="Password" v-model="newPassword">
          <i class="fa fa-lock"></i>
        </p>
        <label class="label">Confirm New Password</label>
        <p class="control has-icon">
          <input class="input" type="password" placeholder="Password" v-model="confirmedPassword">
            <i class="fa fa-lock"></i>
          </p>
          <button type="submit" class="button is-primary">Save</button>
        </form>
        `,

        mounted() {
          this.passwordResource = this.$resource('api/user/changePassword');
        },

        data() {
          return {
            password: '',
            newPassword: '',
            confirmedPassword: ''
          }
        },

        methods: {
          changePassword() {
            this.passwordResource.save({}, {oldPassword: this.password, newPassword: this.newPassword, confirmedPassword: this.confirmedPassword })
            .then((response) => {
              console.log('Password changed');
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      });
