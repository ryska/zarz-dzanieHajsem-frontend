Vue.component('change-report', {
  template: `
  <form class="login__form form" @submit.prevent="updateReport">
        <p class="control">
          <label class="checkbox">
            <input type="checkbox" v-model="report">
              I want to receive emails
            </label>
          </p>
          <button type="submit" class="button is-primary">Save</button>
        </form>
        `,

        mounted() {
          this.reportResource = this.$resource('api/user/changeReport');
        },

        data() {
          return {
            report: localStorage.report;
          }
        },

        methods: {
          updateReport() {
            this.reportResource.save({}, { newReport: this.report })
            .then((response) => {
              console.log('Report changed');
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      });
