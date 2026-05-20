<template>
  <div class="form-check" :class="classContainer">
    <input
      :id="id"
      ref="inputRef"
      :value="modelValue"
      v-bind="$attrs"
      type="radio"
      class="form-check-input"
      :checked="isChecked"
      :aria-describedby="hint !== undefined ? getHintId() : undefined"
      @input="onInput"
      @invalid="onInvalid"
    >
    <label
      v-if="label !== undefined"
      :for="id"
      class="form-check-label"
      v-text="label"
    />
    <div
      v-if="validatorEnabled && validator.getInvalidMessage() !== null"
      class="invalid-feedback"
      v-text="validator.getInvalidMessage()"
    />
    <div
      v-if="hint !== undefined"
      :id="getHintId()"
      class="form-text"
      v-text="hint"
    />
  </div>
</template>

<script lang="ts">
import { type CustomValidatorMessages, useValidator } from '@zemkogabor/vue-form-validator'
import { ref, type Ref, defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'BsRadio',
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
      type: [String, Number, null],
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
      default: undefined,
    },
    /**
     * Attribute hint
     */
    hint: {
      type: String,
      default: undefined,
    },
    /**
     * Input container div class.
     */
    classContainer: {
      type: String,
      default: undefined,
    },
    /**
     * Enable or disable validator
     */
    validatorEnabled: {
      type: Boolean,
      default: true,
    },
    /**
     * Custom validator messages, e.g. minlength validation with custom message
     */
    customValidatorMessages: {
      type: Object as PropType<CustomValidatorMessages>,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const inputRef: Ref<HTMLInputElement | null> = ref(null)

    return {
      inputRef,
      validator: useValidator(inputRef, props.customValidatorMessages),
    }
  },
  computed: {
    /**
     * Radio is checked or not.
     */
    isChecked(): boolean {
      return this.modelValue === this.value
    },
  },
  methods: {
    /**
     * Hint id is generated
     */
    getHintId(): string {
      return this.id + 'Hint'
    },
    /**
     * On input event
     */
    onInput(): void {
      this.$emit('update:modelValue', this.value)
    },
    /**
     * On invalid event
     *
     * @param event
     */
    onInvalid(event : Event): void {
      if (!this.validatorEnabled) {
        return
      }

      this.validator.onInvalid(event)
    },
  },
})
</script>
