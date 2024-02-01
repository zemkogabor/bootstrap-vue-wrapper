<template>
  <div class="form-check" :class="classContainer">
    <input
      :id="id"
      ref="inputRef"
      :value="modelValue"
      v-bind="$attrs"
      type="checkbox"
      class="form-check-input"
      :checked="isChecked"
      :aria-describedby="hint !== undefined ? getHintId() : null"
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
import { useValidator } from '@/components/validator/Validator.ts'
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  name: 'BsCheckbox',
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
  },
  emits: ['update:modelValue'],
  setup() {
    const inputRef: Ref<HTMLInputElement | null> = ref(null)

    return {
      inputRef,
      validator: useValidator(inputRef),
    }
  },
  computed: {
    /**
     * Checkbox is checked or not.
     */
    isChecked(): boolean {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === true
    },
  },
  methods: {
    /**
     * Hint id is generated
     */
    getHintId(): String {
      return this.id + 'Hint'
    },
    /**
     * On input event
     *
     * @param event
     */
    onInput(event : InputEvent): void {
      const target = event.target as HTMLInputElement
      const isChecked = target.checked

      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('update:modelValue', newValue)
      } else {
        this.$emit('update:modelValue', isChecked)
      }
    },
    /**
     * On invalid event
     *
     * @param event
     */
    onInvalid(event : InputEvent): void {
      if (!this.validatorEnabled) {
        return
      }

      this.validator.onInvalid(event)
    },
  },
})
</script>
