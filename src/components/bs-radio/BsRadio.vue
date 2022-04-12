<template>
  <div class="form-check" :class="classContainer">
    <input
      :id="id"
      ref="validationTarget"
      :value="modelValue"
      v-bind="$attrs"
      type="radio"
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
    <div
      v-if="invalidMessage !== null && !hideValidationMessage"
      class="invalid-feedback"
      v-text="invalidMessage"
    />
    <div
      v-if="hint !== null"
      :id="getHintId()"
      class="form-text"
      v-text="hint"
    />
  </div>
</template>

<script>
import validator from '../../mixins/validator.js'

export default {
  name: 'BsRadio',
  mixins: [validator],
  props: {
    /**
     * Radio value
     */
    value: {
      type: [String, Number],
      default: null,
    },
    /**
     * Value for v-model
     */
    modelValue: {
      type: [String, Number],
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
     * Input container div class.
     */
    classContainer: {
      type: String,
      default: null,
    },
    /**
     * If this is true the validation message does not appear.
     */
    hideValidationMessage: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    /**
     * Radio is checked or not.
     */
    isChecked() {
      return this.modelValue === this.value
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
      this.$emit('update:modelValue', this.value)
    },
  },
}
</script>
