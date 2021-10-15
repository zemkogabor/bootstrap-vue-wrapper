<template>
  <div class="form-check">
    <input
      :id="id"
      ref="validationTarget"
      :value="modelValue"
      v-bind="$attrs"
      type="checkbox"
      class="form-check-input"
      :checked="isChecked"
      :aria-describedby="hint !== null ? getHintId() : null"
      @input="onInput"
      @invalid="onInvalid"
    >
    <label
      v-if="label !== null"
      :for="id"
      class="form-check-label"
      v-text="label"
    />
  </div>
  <div
    v-if="invalidMessage !== null"
    class="invalid-feedback"
    v-text="invalidMessage"
  />
  <div
    v-if="hint !== null"
    :id="getHintId()"
    class="form-text"
    v-text="hint"
  />
</template>

<script>
import validator from '../../mixins/validator.js'

export default {
  name: 'BsCheckbox',
  mixins: [validator],
  props: {
    /**
     * Value for checkbox if v-model is array.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * Value for v-model
     */
    modelValue: {
      type: [Array, Boolean],
      default: null,
    },
    /**
     * Html id
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Label for input
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * Attribute hint
     */
    hint: {
      type: String,
      default: null,
    },
    /**
     * True value
     */
    trueValue: {
      type: Boolean,
      default: true,
    },
    /**
     * False value
     */
    falseValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    /**
     * Checkbox is checked or not.
     */
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === this.trueValue
    },
  },
  methods: {
    /**
     * Hint id is generated
     */
    getHintId() {
      return this.id + 'Hint'
    },
    /**
     * On input event
     *
     * @param event
     */
    onInput(event) {
      const isChecked = event.target.checked

      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('update:modelValue', newValue)
      } else {
        this.$emit('update:modelValue', isChecked ? this.trueValue : this.falseValue)
      }
    },
  },
}
</script>
