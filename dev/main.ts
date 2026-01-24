import { createApp } from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import './assets/main.scss'
import 'bootstrap'
import { createRouter, createWebHistory } from 'vue-router'
import { VALIDATOR_CONFIG_KEY } from '@zemkogabor/vue-form-validator'

const app = createApp(App)

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
]

app.use(createRouter({
  history: createWebHistory(),
  routes,
}))

const messages = {
  valueMissing: 'This field is required',
  tooShort: (minLength: number) => `Please enter at least ${minLength} characters`,
  tooLong: (maxLength: number) => `Please enter no more than ${maxLength} characters`,
  rangeUnderflow: (min: string) => `Value must be at least ${min}`,
  rangeOverflow: (max: string) => `Value must be at most ${max}`,
  typeMismatchEmail: 'Please enter a valid email address',
  typeMismatchUrl: 'Please enter a valid URL',
  badInputNumber: 'Please enter a valid number',
  badInputDate: 'Please enter a valid date',
  patternMismatch: 'Please match the requested format',
  stepMismatch: (nearestMin: number, nearestMax: number) => `Please enter a valid value. Nearest valid values are ${nearestMin} and ${nearestMax}`,
}

app.provide(VALIDATOR_CONFIG_KEY, {
  messages,
})

app.mount('#app')
