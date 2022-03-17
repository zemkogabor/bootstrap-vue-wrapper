<template>
  <label
    v-if="label !== null"
    :for="id"
    class="form-label"
    v-text="label"
  />
  <select
    ref="validationTarget"
    class="form-select"
    :value="modelValue"
    :aria-labelledby="hint !== null ? getHintId() : null"
    v-bind="$attrs"
    @input="onInput"
    @invalid="onInvalid"
  >
    <option
      v-if="placeholder !== null"
      value=""
      disabled
      hidden
    >
      {{ placeholder }}
    </option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
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
</template>

<script>
import validator from '../../mixins/validator.js'

export default {
  name: 'BsInput',
  mixins: [validator],
  props: {
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
     * Options
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * Placeholder
     */
    placeholder: {
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
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>
