Vue.component('change-report', {
  template: `
  <form class="login__form form" @submit.prevent="updateReport">
    <p class="control">
      <label class="checkbox">
        <input type="checkbox" v-model="report">
          I want to receive reminder emails
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
      report: User.getReport()
    };
  },

  methods: {
    updateReport() {
      this.reportResource.save({}, { newReport: this.report })
      .then((response) => {
        User.setReport(this.report);
        console.log('Report changed', this.report, typeof this.report);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
});
