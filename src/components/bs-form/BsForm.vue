<template>
  <form
    class="needs-validation"
    :class="{
      'was-validated': submitClicked,
    }"
    novalidate
    @submit="onSubmit"
  >
    <slot />
  </form>
</template>

<script>
export default {
  name: 'BsForm',
  emits: ['submit'],
  data() {
    return {
      submitClicked: false,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.submitClicked = true

      this.$emit('submit', event)
    },
  },
}
</script>
