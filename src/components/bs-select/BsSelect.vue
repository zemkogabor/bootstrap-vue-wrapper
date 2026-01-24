<template>
  <label
    v-if="label !== undefined"
    :for="id"
    class="form-label"
    v-text="label"
  />
  <select
    :id="id"
    ref="inputRef"
    class="form-select"
    :value="modelValue"
    :aria-labelledby="hint !== undefined ? getHintId() : undefined"
    v-bind="$attrs"
    @input="onInput"
    @invalid="onInvalid"
  >
    <option
      v-if="placeholder !== undefined"
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
      :disabled="option.disabled !== undefined && option.disabled"
    >
      {{ option.text }}
    </option>
  </select>
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
import { defineComponent, type PropType, ref, type Ref } from 'vue'
import type Option from '@/types/Option.ts'

export default defineComponent({
  name: 'BsSelect',
  props: {
    /**
     * Value for v-model
     */
    modelValue: {
      type: [String, Number, Array, null] as PropType<number | string | string[] | number[] | null>,
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
     * Options
     */
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    /**
     * Placeholder
     */
    placeholder: {
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
      this.$emit('update:modelValue', target.value)
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
