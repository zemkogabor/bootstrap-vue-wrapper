<template>
  <div
    ref="toastRef"
    class="toast hide"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <slot />
  </div>
</template>

<script>
import { Toast } from 'bootstrap'

export default {
  name: 'BsToast',
  mounted() {
    const toastElement = this.$refs.toastRef
    Toast.getOrCreateInstance(toastElement).show()
  },
}
</script>
