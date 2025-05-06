<template>
  <h1>
    Bootstrap Vue Wrapper
  </h1>
  <h2>Form inputs</h2>
  <bs-form ref="formRef" class="mb-5" @submit="onSubmit">
    <div class="mb-3">
      <bs-input
        id="emailInput"
        ref="emailInputRef"
        v-model="email"
        type="email"
        label="Email"
        required
        hint="Input with native (required) validation"
      />
    </div>
    <div class="mb-3">
      <bs-input
        id="usernameInput"
        ref="usernameInputRef"
        v-model="username"
        label="Username"
        hint="Input with custom validation ('admin' username invalid)"
        :minlength="3"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" v-text="'Postal code'" />
      <div class="input-group">
        <bs-input
          id="postalCodeInput"
          ref="postalCodeInputRef"
          v-model="postalCode"
          type="text"
          :validator-enabled="false"
          required
          @invalid="postalCodeValidator.onInvalid"
        />
        <button
          class="btn btn-primary rounded-end"
          type="button"
          :disabled="postalCode === null"
        >
          Search
        </button>
        <div v-if="postalCodeValidator.getInvalidMessage()" class="invalid-feedback">
          {{ postalCodeValidator.getInvalidMessage() }}
        </div>
      </div>
      <div class="form-text">
        Disable inner validator and using outside of the bs-input (useful if you need to display the validation message differently)
      </div>
    </div>
    <div class="mb-3">
      <bs-checkbox
        id="inputCheckbox"
        v-model="inputCheckbox"
        name="inputCheckboxName"
        class-container="form-switch"
        label="Checkbox"
        required
        @update:model-value="onCheckboxChange"
      />
      = {{ inputCheckbox }}
    </div>
    <div class="mb-3">
      <div class="mb-1">
        Checkbox array
      </div>
      <div class="row">
        <div
          v-for="(option, index) in inputCheckboxOptions"
          :key="index"
          class="col-12 col-md-6"
        >
          <bs-checkbox
            id="inputCheckboxArray"
            v-model="inputCheckboxArray"
            :value="option.key"
            name="inputCheckboxArrayName"
            :label="option.label"
          />
        </div>
      </div>
      = {{ inputCheckboxArray }}
    </div>
    <div class="mb-3">
      <bs-textarea
        id="noteInput"
        v-model="note"
        label="Note"
        minlength="3"
        maxlength="50"
        hint="Text area with min (3) and max (50) length"
      />
    </div>
    <div class="mb-3">
      <div class="mb-1">
        Radio
      </div>
      <bs-radio
        v-for="(customerValue, index) in customers"
        id="customerRadio"
        :key="index"
        v-model="customerSelected"
        :value="customerValue"
        name="customerRadio"
        :label="customerValue"
      />
      = {{ customerSelected }}
    </div>
    <div class="mb-3">
      <bs-select
        id="citySelect"
        v-model="citySelected"
        :options="cityOptions"
        label="City"
        required
      />
    </div>
    <button class="btn btn-primary">
      Submit
    </button>
  </bs-form>
  <h2>Breadcrumb</h2>
  <bs-breadcrumb :items="breadCrumbItems" class="mb-5" />
  <h2>Modal</h2>
  <bs-modal
    v-if="modalShown"
    title="Modal"
    @hide="onModalHide"
    @hidden="modalShown = false"
  >
    <template #body>
      Example modal
    </template>
  </bs-modal>
  <button class="btn btn-primary mb-5" @click="showModal">
    Show modal
  </button>
  <h2>Offcanvas</h2>
  <bs-offcanvas
    v-if="offcanvasShown"
    title="Offcanvas"
    class="offcanvas-end"
    @hidden="offcanvasShown = false"
  >
    <template #body>
      Example offcanvas
    </template>
  </bs-offcanvas>
  <button class="btn btn-primary mb-5" @click="showOffcanvas">
    Show offcanvas
  </button>
  <h2>Toast</h2>
  <button
    type="button"
    class="btn btn-primary mb-5"
    @click="showToast"
  >
    Show toast
  </button>
  <div class="position-fixed bottom-0 end-0 p-3 toast-container">
    <bs-toast
      v-if="toastShown"
      class="text-bg-primary"
      @hidden="toastShown = false"
    >
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" />
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </bs-toast>
  </div>
  <h2>Table</h2>
  <bs-table
    class="table-hover table-nowrap table-bordered"
    :fields="tableFields"
    :items="tableItems"
    order-by="id"
    :sort-desc="false"
    :is-loading="false"
  >
    <template #td="data">
      <span v-if="data.field === 'action'">
        <button type="button" class="btn btn-primary">Download</button>
      </span>
      <template v-else>
        {{ data.value }}
      </template>
    </template>
  </bs-table>
  <bs-paginator
    class="mb-5"
    :current-page="1"
    :page-size="10"
    :total-count="500"
  />
</template>

<script lang="ts">
import {
  BsForm,
  BsInput,
  BsCheckbox,
  BsTextarea,
  BsRadio,
  BsSelect,
  BsBreadcrumb,
  BsModal,
  BsOffcanvas,
  BsToast,
  BsTable,
  BsPaginator,
  useValidator,
} from '@/index'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  components: {
    BsInput,
    BsForm,
    BsCheckbox,
    BsTextarea,
    BsRadio,
    BsSelect,
    BsBreadcrumb,
    BsModal,
    BsOffcanvas,
    BsToast,
    BsTable,
    BsPaginator,
  },
  setup() {
    const postalCodeInputRef = ref(null)
    const postalCodeValidator = useValidator(postalCodeInputRef)

    return {
      postalCodeInputRef,
      postalCodeValidator,
    }
  },
  data() {
    return {
      email: '',
      username: '',
      postalCode: '',
      inputCheckbox: true,
      inputCheckboxArray: [],
      inputCheckboxOptions: [
        {
          key: 'input1',
          label: 'Input 1',
        },
        {
          key: 'input2',
          label: 'Input 2',
        },
        {
          key: 'input3',
          label: 'Input 3',
        },
        {
          key: 'input4',
          label: 'Input 4',
        },
      ],
      note: '',
      customers: ['George', 'John', 'Paul', 'Ringo'],
      customerSelected: null,
      cityOptions: [
        {
          value: 1,
          text: 'Bratislava',
        },
        {
          value: 2,
          text: 'Kosice',
          disabled: true,
        },
        {
          value: 3,
          text: 'Zilina',
        },
      ],
      citySelected: null,
      breadCrumbItems: [
        {
          title: 'Home',
        },
        {
          title: 'About',
          route: {
            name: 'about',
          },
        },
      ],
      modalShown: false,
      offcanvasShown: false,
      toastShown: false,
      tableFields: [
        {
          key: 'id',
          label: 'ID',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      tableItems: [
        { id: 1, name: 'John' },
        { id: 2, name: 'George' },
        { id: 3, name: 'Paul' },
        { id: 4, name: 'Ringo' },
      ],
    }
  },
  methods: {
    onSubmit(event : SubmitEvent): void {
      if (this.username === 'admin') {
        this.$refs.usernameInputRef.validator.setCustomError('Username is already taken')
      } else {
        this.$refs.usernameInputRef.validator.setCustomError(null)
      }

      const target = event.target as HTMLFormElement
      if (!target.checkValidity()) {
        console.log('validation failed')
        return
      }

      console.log('submit success')
    },
    showModal(): void {
      this.modalShown = true
    },
    showOffcanvas(): void {
      this.offcanvasShown = true
    },
    showToast(): void {
      this.toastShown = true
    },
    onCheckboxChange(): void {
      console.log('Checkbox change, value: ' + this.inputCheckbox)
    },
    onModalHide(event: Event): void {
      // if you want to prevent the modal from closing, you can use event.preventDefault()
      // event.preventDefault()
      console.log(event)
    },
  },
})
</script>
