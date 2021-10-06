<template>
  <label
    v-if="label !== null"
    :for="id"
    class="form-label"
    v-text="label"
  />
  <input
    ref="validationTarget"
    :value="modelValue"
    v-bind="$attrs"
    :aria-describedby="hint !== null ? getHintId() : null"
    @input="onInput"
    @invalid="onInvalid"
  >
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
  name: 'BsInput',
  mixins: [validator],
  props: {
    /**
     * Value for v-model
     */
    modelValue: {
      type: String,
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
