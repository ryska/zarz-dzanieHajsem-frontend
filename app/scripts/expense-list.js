const ExpenseList = {
  template: `
  <div class="expenses-container">
    <div class="tabs tab-nav">
      <ul>
        <li :class="{'is-active': visible==='expenses-list'}" class="" @click.prevent="visible='expenses-list'"><a>All Expenses</a></li>
        <li :class="{'is-active': visible==='expense-new'}" class="" @click.prevent="visible='expense-new'"><a>New Expense</a></li>
        <li :class="{'is-active': visible==='category-new'}" class="" @click.prevent="visible='category-new'"><a>New Category</a></li>
      </ul>
    </div>
    <div class="expenses" v-show="visible === 'expenses-list'">
      <div class="level">
        <div class="level-left">
          <h2 class="title title-1 cursor-pointer">Your Expenses:</h2>
        </div>

        <div class="level-right">
          <label class="label">Sort by:</label>
          <p class="control">
            <span class="select">
              <select @change="sortExpenses(sort)" v-model="sort">
                <option v-for="option in sortOptions" v-bind:value="option.value">
                  {{ option.name }}
                </option>
              </select>
            </span>
          </p>
        </div>
      </div>
      <div class="box">
        <table class="table is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price [zl]</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <expense-item v-for="expense in expenses" :name="expense.name" :dateOfExpense="expense.dateOfExpense" :value="expense.value" :category="expense.category"></expense-item>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="visible === 'expense-new'">
      <expense-new></expense-new>
    </div>
    <div v-show="visible === 'category-new'">
      <category-new></category-new>
    </div>
  </div>
  `,
  data() {
    return {
      sort: 'dateDesc',
      sortOptions:  [
        {
          value: 'priceAsc',
          name: 'Price low to high'
        },
        {
          value: 'priceDesc',
          name: 'Price high to low'
        },
        {
          value: 'dateAsc',
          name: 'Date - oldest'
        },
        {
          value: 'dateDesc',
          name: 'Date - latest'
        }
      ],
      expenses: [],
      visible: 'expenses-list'
    }
  },

  created() {
    this.expensesResource = this.$resource('api/expense/list');
    this.sortResource = this.$resource('api/expense/list/sort{/sortType}')

    bus.$on('new-expense', () => {
      this.getExpenses();
    });

    this.getExpenses();
  },

  methods: {
    sortExpenses(sortType) {
      this.sortResource.get({sortType: sortType})
      .then((response) => {
        response.json().then((json) => {
          const expenses = json.map((expense) => {
            var time = moment(expense.dateOfExpense);
            return {
              name: expense.name,
              value: expense.value,
              dateOfExpense: time.format('DD/MM/YYYY'),
              category: expense.category.categoryName
            };
          })
          console.log(expenses, 'nowe');
          this.$set(this, 'expenses', expenses);
        });
      });
    },

    getExpenses() {
      this.expensesResource.get().then((response) => {
        response.json().then((json) => {
          const expenses = json.map((expense) => {
            var time = moment(expense.dateOfExpense);
            return {
              name: expense.name,
              value: expense.value,
              dateOfExpense: time.format('DD/MM/YYYY'),
              category: expense.category.categoryName
            };
          })
          console.log(expenses);
          this.$set(this, 'expenses', expenses);
        });
      });
    },

  }
};
