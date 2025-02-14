import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import axios from 'axios'
import VueAxios from 'vue-axios';

const app = createApp(App);

app.use(router);
app.use(VueAxios, { axios: axios.create({
  baseURL: 'http://localhost:3008/'
})})

app.provide('axios', app.config.globalProperties.axios)

app.mount('#app');