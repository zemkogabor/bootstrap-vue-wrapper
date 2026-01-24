# Changelog

## [3.0.0] - 2026-01-24
**Major Changes**
- Drop vue-i18n and vue-router dependencies: The library has removed its dependencies on vue-i18n and vue-router to streamline the codebase and reduce bundle size. Users are encouraged to implement their own internationalization and routing solutions as needed.
- Replaced built in validator with @zemkogabor/vue-form-validator: The built-in validator has been replaced with the external @zemkogabor/vue-form-validator package, allowing for more flexible and powerful validation capabilities.
- Added empty string to null conversion to BsInput and BsTextarea components: Now automatically convert empty strings to null values, improving data handling and consistency. You can disable with `emptyStringToNull` property.

**New Features:**
- Added trim property to BsInput and BsTextarea components: This new property allows automatic trimming of whitespace from user input, enhancing data quality and user experience.

## [2.0.0] - 2024-02-01
**Major Changes**
- Codebase Rewrite: The entire codebase has been rewritten in TypeScript, providing stronger type guarantees, improved maintainability, and enhanced developer experience.
- `BsTable` template `item` property renamed to `value`
- `hideValidationMessage` property has been removed. Instead, use the `validatorEnabled` property to disable validation.

**New Features:**
- Development Support Enhancements: Introduced a dedicated examples directory within the development (dev) folder, offering a comprehensive suite of examples to assist developers in understanding and utilizing the library's capabilities more effectively.

**Improvements:**
- Validator Component Overhaul: Rethought and redesigned the validator component. It is no longer implemented as a mixin. Instead, it is now a standalone component utilizing the Composition API, aligning with modern Vue.js best practices and improving its reusability and composability in applications.

**Fixes:**
- Bug Fixes: Addressed various bugs and issues identified in the previous versions, enhancing the stability and reliability of the library.

**Migrate from 1.x to 2.x:**

If you want to display the validation message elsewhere, not directly below the input, this could previously be achieved as follows:
```
<div class="input-group">
  <bs-input
    id="customerNameInput"
    ref="customerNameInputRef"
    v-model="customerName"
    type="text"
    :hide-validation-message="true"
    minlength="3"
    @invalid="onCustomerNameInvalid"
  />
  <button
    class="btn btn-primary rounded-end"
    type="submit"
  >
    Search
  </button>
  <div v-if="customerNameInvalidMessage !== null" class="invalid-feedback">
    {{ customerNameInvalidMessage }}
  </div>
</div>

...

/**
 * @param invalidMessage
 */
onCustomerNameInvalid(invalidMessage) {
  this.customerNameInvalidMessage = invalidMessage
},
```

In version 2.x, it can be done like this:
```
<div class="input-group">
  <bs-input
    id="customerNameInput"
    ref="customerNameInputRef"
    v-model="customerName"
    type="text"
    minlength="3"
    :validator-enabled="false"
    @invalid="customerNameValidator.onInvalid"
  />
  <button
    class="btn btn-primary rounded-end"
    type="submit"
  >
    Search
  </button>
  <div v-if="customerNameValidator.getInvalidMessage() !== null" class="invalid-feedback">
    {{ customerNameValidator.getInvalidMessage() }}
  </div>
</div>

...
  
setup() {
  const customerNameValidator = useValidator(customerNameInputRef)
}
```
