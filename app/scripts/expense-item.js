Vue.component('expense-item', {
  template: `
  <li class="expense__item expense">
    <span class="expense__title"> {{ title }} </span>
    <span class="expense__price"> {{ price }} </span>
    <span class="expense__date"> {{ date }} </span>
    <span class="expense__category"> {{ category }} </span>
  </li>
  `,
  props: ['title', 'price', 'date', 'category']

});
