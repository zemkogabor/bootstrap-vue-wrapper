# Bootstrap-Vue Wrapper

[![NPM version](https://img.shields.io/npm/v/bootstrap-vue-wrapper.svg)](https://www.npmjs.com/package/bootstrap-vue-wrapper)


## Requirements:
- bootstrap 5
- bootstrap icons
- Vue i18n (for custom validation messages)
- Vue router (for `<router-link>`)
- Vue 3

## Install:

```bash
npm install bootstrap-vue-wrapper
```
## Examples:


### Table:

```html
<bs-table
  class="table-striped table-hover"
  :fields="fields"
  :items="items"
  :order-by="orderBy"
  :is-loading="isLoading"
  @orderChanged="onOrderChanged"
/>

...

<script>
  import { BsTable } from 'bootstrap-vue-wrapper'
</script>
```

### Custom validation message:

```html
<bs-input
  id="emailInput"
  ref="emailInputRef"
  v-model="email"
  type="email"
  label="Email"
  required
/>

...

<script>
  errorFromServer() {
    this.$refs.emailInputRef.setCustomError('Email is already taken.')
  }
</script>
```
