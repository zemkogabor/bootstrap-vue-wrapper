import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import Home from './pages/Home.vue'
// @ts-ignore
import About from './pages/About.vue'
import './assets/main.scss'
import 'bootstrap'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
]

app.use(createRouter({
  history: createWebHistory(),
  routes,
}))

app.use(createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en: {
      'validator.error.value_missing': 'Please fill out this field.',
      'validator.error.too_short': 'Please use at least {0} characters.',
      'validator.error.too_long': 'Only {0} characters allowed.',
      'validator.error.type_mismatch.email': 'Please enter an email address.',
      'validator.error.type_mismatch.url': 'Please enter a URL.',
      'validator.error.bad_input.number': 'Please enter a number.',
      'validator.error.bad_input.date': 'Please enter a valid date.',
      'validator.error.pattern_mismatch': 'Please match the requested format.',
      'validator.error.range_underflow': 'Please select a value that is no less than {0}.',
      'validator.error.range_overflow': 'Please select a value that is no more than {0}.',
      'validator.error.step_mismatch': 'Please select a valid value. The two nearest valid values are {0} and {1}.',
    },
  },
}))

app.mount('#app')
