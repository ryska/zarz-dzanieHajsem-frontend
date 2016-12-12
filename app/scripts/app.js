Vue.http.options.root = 'http://localhost:8000';

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home },
  { path: '/expenses', component: ExpenseList },
  { path: '/statistics', component: Statistics },
  { path: '/profile', component: Profile }
]


const router = new VueRouter({
  routes
})

var app = new Vue({
  router: router,
  el: '#app',
})
