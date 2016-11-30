const ExpenseList = {
  template: `
  <div class="expenses">
    <h2 class="expenses__heading">Latest Expenses:</h2>
    Sort by:
    <select @change="sortExpenses(sort)" v-model="sort">
      <option value="low_to_high">Price low to high</option>
      <option value="high_to_low">Price high to low</option>
      <option value="latest">Date - latest</option>
      <option value="oldest">Date - oldest</option>
    </select>
    <ul class="expenses__list">
      <expense-item v-for="expense in expenses" :title="expense.title" :price="expense.price" :date="expense.date" :category="expense.category"></expense-item>
    </ul>
    <expense-form></expense-form>
  </div>
  `,
  data() {
    return {
      expenses: [{
        title: 'buty',
        price: '100$',
        date: '02-04-2016',
        category: 'food'
      },
      {
        title: 'spodnie',
        price: '99$',
        date: '02-04-2016',
        category: 'clothes'
      },
      {
        title: 'warzywa',
        price: '12$',
        date: '12-10-2016',
        category: 'food'
      },
      sort: 'latest'
    }
  },

  created() {
    this.expensesResource = this.$resource('api/expense/list{/sortType}');

   this.getExpenses();
  },

  methods: {
    sortExpenses(sortType) {
      console.log(sortType);
    },

    getExpenses() {
      this.expensesResource.get().then((response) => {
        this.expenses = response.json();
      });
    }
  }
};
