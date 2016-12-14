Vue.component('expense-new', {
  template: `
  <div class="expense-form__container  container">
    <h2 class="title title-1 cursor-pointer" @click="toggleSlide">Add new expense:</h2>

    <form id="new_expense_form" class="form js-new-expense-form" @submit.prevent="addNewExpense">
      <label for="new_expense_title" class="form__label">Title</label>
      <input type="text" id="new_expense_title" class="form__input" v-model="title" required></input>
      <label for="new_expense_price" class="form__label">Price:</label>
      <input type="text" id="new_expense_price" class="form__input" v-model="price" required></input>
      <label for="new_expense_date" class="form__label">Date:</label>
      <input type="date" id="new_expense_date" class="form__input"  v-model="date" required></input>
      <label for="new_expense_category" class="form__label">Category:</label>
      <select class="form__input" v-model="category" required>
        <option v-for="expenseCategory in categories" v-bind:value="expenseCategory.value" >
          {{ expenseCategory.text }}
        </option>
      </select>
      <button type="submit" id="new_expense_button" class="button is-primary">Add</button>
    </form>
  </div>

  `,

  created() {
    this.expenseResource = this.$resource('api/expense');
    this.categoryResource = this.$resource('api/category{/action}');

    bus.$on('new-category', () => {
      this.getCategories();
    });
    this.getCategories();
  },

  data() {
    return {
      category: '',
      title: '',
      price: '',
      date: '',
      categories: []
    }
  },

  methods: {
    addNewExpense() {
      this.expenseResource.save({}, {
        category: {
          categoryName: this.category
        },
        name: this.title,
        value: this.price,
        dateOfExpense: this.date
      }).then((response) => {
        bus.$emit('new-expense');
        console.log('dodalem!');
      });
    },

    toggleSlide() {
      $('#new_expense_form').slideToggle();
    },

    getCategories() {
      this.categoryResource.get({action: 'list'}).then((response) => {
        response.json().then((json) => {
          const categories = json.map((category) => {
            return {
              text: category.categoryName,
              value: category.categoryName
            }
          });
          console.log(categories);
          this.$set(this, 'categories', categories);
        });
      });
    }
  }
  // props: ['title', 'price', 'date', 'category']

});
