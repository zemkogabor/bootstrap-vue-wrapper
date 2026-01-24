<template>
  <label
    v-if="label !== undefined"
    :for="id"
    class="form-label"
    v-text="label"
  />
  <textarea
    :id="id"
    ref="inputRef"
    :value="modelValue"
    v-bind="$attrs"
    class="form-control"
    :aria-describedby="hint !== undefined ? getHintId() : undefined"
    @input="onInput"
    @invalid="onInvalid"
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
</template>

<script lang="ts">
import { useValidator } from '@zemkogabor/vue-form-validator'
import { defineComponent, ref, type Ref } from 'vue'

export default defineComponent({
  name: 'BsTextarea',
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
     * Label for textarea
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
     * Enable or disable validator
     */
    validatorEnabled: {
      type: Boolean,
      default: true,
    },
    /**
     * Convert empty string to null
     */
    emptyStringToNull: {
      type: Boolean,
      default: true,
    },
    /**
     * Trim input value
     */
    trim: {
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
  methods: {
    /**
     * Hint id is generated
     */
    getHintId(): string {
      return this.id + 'Hint'
    },
    /**
     * On input event
     *
     * @param event
     */
    onInput(event : Event): void {
      const target = event.target as HTMLInputElement

      let value = target.value as string | null

      if (this.trim) {
        value = target.value.trim()
      }

      if (this.emptyStringToNull && value === '') {
        value = null
      }

      this.$emit('update:modelValue', value)
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
