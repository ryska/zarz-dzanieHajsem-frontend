Vue.component('chart-category', {
  template: `
  <div class="chart-container">
    <canvas class="chart" id="myChart" width="400" height="400" ref="categoryChart"></canvas>
  </div>
  `,

  mounted() {
    this._categoryChart = null;
    this.getData();

  },

  created() {
    this.statisticsResource = this.$resource('api/statistic/category');

  },

  methods: {
    initChart(data) {
      console.log(data);
      if (this._categoryChart !== null) {
        this._categoryChart.destroy();
      }
      this._categoryChart = new Chart(this.$refs.categoryChart, {
        type: 'bar',
        data: {
          labels: data.label,
          datasets: [{
            label: 'By Category',
            data: data.value,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
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
      this.statisticsResource.get().then((response) => {
        response.json().then((json) => {
          const stats = {
            label: [],
            value: []
          };
          json.forEach((statistic) => {
              stats.label.push(statistic.categoryName);
              stats.value.push(statistic.value);
          });
          this.initChart(stats);
        });
      });
    }
  }

});
