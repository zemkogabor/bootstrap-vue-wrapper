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
  props: {
    /**
     * If this is true the validation message does not appear.
     */
    hideValidationMessage: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * On invalid event.
     *
     * @param event
     */
    onInvalid(event) {
      if (this.hideValidationMessage) {
        return
      }

      this.invalidMessage = this.getInvalidMessage(event.target)
    },
    /**
     * Set custom error
     *
     * Use in parent component, e.g.: this.$refs.emailInputRef.setCustomError('Email is already taken.')
     *
     * @param data
     */
    setCustomError(data) {
      const validationTarget = this.$refs.validationTarget

      if (data !== null) {
        validationTarget.setCustomValidity(data)
      } else {
        validationTarget.setCustomValidity('')
      }

      if (!this.hideValidationMessage) {
        this.invalidMessage = this.getInvalidMessage(validationTarget)
      }
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

      if (input.validity.typeMismatch) {
        if (input.type === 'email') {
          return this.$t('validator.error.type_mismatch.email')
        }

        if (input.type === 'url') {
          return this.$t('validator.error.type_mismatch.email')
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
