import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import firebase from './firebase';
import auth from './auth';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Buefy);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
