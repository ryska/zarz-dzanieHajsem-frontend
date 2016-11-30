Vue.http.options.root = 'http://localhost:8000';

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home },
  { path: '/expenses', component: ExpenseList }
]


const router = new VueRouter({
  routes
})
var app = new Vue({
  router: router,
  el: '#app',
})
