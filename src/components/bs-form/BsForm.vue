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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BsForm',
  emits: ['submit'],
  data() {
    return {
      submitClicked: false,
    }
  },
  methods: {
    /**
     * On submit event.
     *
     * @param event
     */
    onSubmit(event : SubmitEvent) {
      event.preventDefault()
      this.submitClicked = true

      this.$emit('submit', event)
    },
  },
})
</script>
