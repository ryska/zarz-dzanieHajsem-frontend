Vue.component('chart-category-month', {
  template: `
  <div class="chart-container">
    <canvas class="chart" id="myChart" width="400" height="400" ref="monthChart"></canvas>
  </div>
  `,

  mounted() {
    this._monthChart = null;
    this.getData();

  },

  created() {
    this.statisticsMonthResource = this.$resource('api/statistic/month');
  },

  methods: {
    initChart(data) {
      console.log(data);
      if (this._monthChart !== null) {
        this._monthChart.destroy();
      }

      this._monthChart = new Chart(this.$refs.monthChart, {
        type: 'bar',
        data: {
          labels: data.label,
          datasets: [{
            label: 'Monthly',
            data: data.value,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255,99,132,1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    },

    getData() {
      this.statisticsMonthResource.get().then((response) => {
        response.json().then((json) => {
          const stats = {
            label: [],
            value: []
          };
          json.forEach((statistic) => {
            stats.label.push(statistic.month + '/' + statistic.year);
            stats.value.push(statistic.value);
          });
          this.initChart(stats);
        });
      });
    }
  }

});
