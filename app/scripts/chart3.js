Vue.component('chart-monthly', {
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
    this.statisticsExpense = this.$resource('api/statistic/day');
  },

  methods: {
    initChart(data) {
      console.log(data);
      if (this._monthChart !== null) {
        this._monthChart.destroy();
      }

      this._monthChart = new Chart(this.$refs.monthChart, {
        type: 'line',
        data: {
          labels: data.label,
          datasets: [{
            label: 'Daily',
            data: data.value,
            backgroundColor: [
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
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
      this.statisticsExpense.get().then((response) => {
        response.json().then((json) => {
          const stats = {
            label: [],
            value: []
          };
          json.forEach((statistic) => {
            var time = moment(statistic.dateOfExpense);
            var time2 = time.format('DD/MM/YYYY');
            stats.label.push(statistic.day + '/' + statistic.month + '/' + statistic.year);
            stats.value.push(statistic.value);
          });
          this.initChart(stats);
        });
      });
    }
  }

});
