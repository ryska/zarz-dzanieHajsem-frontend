Vue.component('expense-item', {
  template: `
  <tr>
    <td> {{ name }} </td>
    <td> {{ value }} </td>
    <td> {{ dateOfExpense }} </td>
    <td> {{ category }} </td>
  </tr>
  `,
  props: ['name', 'value', 'dateOfExpense', 'category']

});
