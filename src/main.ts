// import Vue
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import PrimeVue
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

const app = createApp(App);

// use Vue
app.use(router);

// use PrimeVue
app.use(PrimeVue);
app.component('Button', Button);
app.component('InputNumber', InputNumber);

app.mount('#app');
