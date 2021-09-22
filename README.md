# Boostrap-Vue Wrapper

[![NPM version](https://img.shields.io/npm/v/boostrap-vue-wrapper.svg)](https://www.npmjs.com/package/boostrap-vue-wrapper)


## Requirements:
- Boostrap 5
- Boostrap icons
- Vue i18n (for custom validation messages)
- Vue router (for `<router-link>`)
- Vue 3

## Install:

```bash
npm install boostrap-vue-wrapper
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
  import { BsTable } from 'boostrap-vue-wrapper'
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
