import { ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useValidator(inputRef : Ref<HTMLInputElement | null>) {
  const { t } = useI18n()
  const invalidMessage: Ref<string | null> = ref(null)

  /**
   * Set custom error
   *
   * Use in parent component, e.g.: this.$refs.emailInputRef.validator.setCustomError('Email is already taken.')
   *
   * @param data
   */
  function setCustomError(data : string) {
    const validationTarget = inputRef.value

    if (validationTarget === null) {
      return
    }

    if (data !== null) {
      validationTarget.setCustomValidity(data)
    } else {
      validationTarget.setCustomValidity('')
    }

    invalidMessage.value = calcInvalidMessage(validationTarget)
  }

  /**
   * Return invalid message.
   *
   * @param input
   * @returns {string|null}
   */
  function calcInvalidMessage(input : HTMLInputElement): string|null {
    if (input.validity.valueMissing) {
      return t('validator.error.value_missing')
    }

    if (input.validity.tooShort) {
      return t('validator.error.too_short', [input.minLength])
    }

    if (input.validity.tooLong) {
      return t('validator.error.too_long', [input.maxLength])
    }

    if (input.validity.rangeUnderflow) {
      return t('validator.error.range_underflow', [input.min])
    }

    if (input.validity.rangeOverflow) {
      return t('validator.error.range_overflow', [input.max])
    }

    if (input.validity.typeMismatch) {
      if (input.type === 'email') {
        return t('validator.error.type_mismatch.email')
      }

      if (input.type === 'url') {
        return t('validator.error.type_mismatch.url')
      }
    }

    if (input.validity.badInput) {
      if (input.type === 'number') {
        return t('validator.error.bad_input.number')
      }
      if (input.type === 'date') {
        return t('validator.error.bad_input.date')
      }
    }

    if (input.validity.patternMismatch) {
      return t('validator.error.pattern_mismatch')
    }

    if (input.validity.stepMismatch) {
      const nearestMin = Math.floor(Number(input.value) / Number(input.step)) * Number(input.step)
      const nearestMax = Math.ceil(Number(input.value) / Number(input.step)) * Number(input.step)

      return t('validator.error.step_mismatch', [nearestMin, nearestMax])
    }

    if (input.validity.customError) {
      return input.validationMessage
    }

    return null
  }

  /**
   * On invalid event.
   *
   * @param event
   */
  function onInvalid(event : Event) {
    if (event.target === null) {
      return
    }

    invalidMessage.value = calcInvalidMessage(event.target as HTMLInputElement)
  }

  /**
   * Return invalid message, null if valid.
   */
  function getInvalidMessage(): string|null {
    return invalidMessage.value
  }

  return {
    onInvalid,
    getInvalidMessage,
    setCustomError,
  }
}
