export default {
  name: 'Validator',
  data() {
    return {
      /**
       * Invalid message
       */
      invalidMessage: null,
    }
  },
  emits: ['invalid'],
  methods: {
    /**
     * On invalid event.
     *
     * @param event
     */
    onInvalid(event) {
      this.invalidMessage = this.getInvalidMessage(event.target)
      this.$emit('invalid', this.invalidMessage)
    },
    /**
     * Set custom error
     *
     * Use in parent component, e.g.: this.$refs.emailInputRef.setCustomError('Email is already taken.')
     *
     * @param data
     */
    setCustomError(data) {
      const validationTarget = this.$refs.inputRef

      if (data !== null) {
        validationTarget.setCustomValidity(data)
        validationTarget.classList.add('is-invalid')
      } else {
        validationTarget.setCustomValidity('')
        validationTarget.classList.remove('is-invalid')
      }

      this.invalidMessage = this.getInvalidMessage(validationTarget)
      this.$emit('invalid', this.invalidMessage)
    },
    /**
     * Return invalid message.
     *
     * @param input
     * @returns {string|null}
     */
    getInvalidMessage(input) {
      if (input.validity.valueMissing) {
        return this.$t('validator.error.value_missing')
      }

      if (input.validity.tooShort) {
        return this.$t('validator.error.too_short', [input.minLength])
      }

      if (input.validity.tooLong) {
        return this.$t('validator.error.too_long', [input.maxLength])
      }

      if (input.validity.rangeUnderflow) {
        return this.$t('validator.error.range_underflow', [input.min])
      }

      if (input.validity.rangeOverflow) {
        return this.$t('validator.error.range_overflow', [input.max])
      }

      if (input.validity.typeMismatch) {
        if (input.type === 'email') {
          return this.$t('validator.error.type_mismatch.email')
        }

        if (input.type === 'url') {
          return this.$t('validator.error.type_mismatch.url')
        }
      }

      if (input.validity.badInput) {
        if (input.type === 'number') {
          return this.$t('validator.error.bad_input.number')
        }
        if (input.type === 'date') {
          return this.$t('validator.error.bad_input.date')
        }
      }

      if (input.validity.patternMismatch) {
        return this.$t('validator.error.pattern_mismatch')
      }

      if (input.validity.stepMismatch) {
        const nearestMin = Math.floor(input.value / input.step) * input.step
        const nearestMax = Math.ceil(input.value / input.step) * input.step

        return this.$t('validator.error.step_mismatch', [nearestMin, nearestMax])
      }

      if (input.validity.customError) {
        return input.validationMessage
      }

      return null
    },
  },
}
