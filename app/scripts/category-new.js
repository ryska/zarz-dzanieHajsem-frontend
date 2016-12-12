Vue.component('category-new', {
  template: `
  <div class="expense-form__container container">
  <h2 class="title title-1">Add new category:</h2>

    <form id="new_category_form" class="form" @submit.prevent="addNewCategory">
      <label for="new_category_title" class="form__label">Category Name:</label>
      <input type="text" id="new_category_title" class="form__input" v-model="name"></input>
      <button type="submit" id="new_category_button" class="button is-primary">Add</button>
    </form>
  </div>

  `,

  created() {
    this.newCategoryResource = this.$resource('api/category');
  },

  data() {
    return {
      name: '',

    }
  },

  methods: {
    addNewCategory() {
      this.newCategoryResource.save({}, {
        categoryName: this.name,
      }).then((response) => {
        bus.$emit('new-category');
        console.log('dodalem!');
      });
    }
  }

});
