const Statistics = {
  template: `
  <div class="stats-container">
    <div class="tabs tab-nav">
      <ul>
        <li :class="{'is-active': visible==='chart-1'}" class="" @click.prevent="visible='chart-1'"><a>Chart 1</a></li>
        <li :class="{'is-active': visible==='chart-2'}" class="" @click.prevent="visible='chart-2'"><a>Chart 2</a></li>
        <li :class="{'is-active': visible==='chart-3'}" class="" @click.prevent="visible='chart-3'"><a>Chart 3</a></li>
      </ul>
    </div>

    <div class="container">

      <div v-show="visible === 'chart-1'">
        <chart-category></chart-category>
      </div>
      <div v-show="visible === 'chart-2'">
        <chart-category-month></chart-category-month>
      </div>
      <div v-show="visible === 'chart-3'">
        <chart-monthly></chart-monthly>
      </div>
    </div>
  </div>
  `,

  data() {
    return {
      visible: 'chart-1',
    }
  }
};
