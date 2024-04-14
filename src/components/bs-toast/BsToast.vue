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

<script lang="ts">
import Toast from 'bootstrap/js/dist/toast'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BsToast',
  emits: ['shown', 'hidden'],

  mounted() {
    const toastElement = this.$refs.toastRef as HTMLElement
    Toast.getOrCreateInstance(toastElement).show()

    toastElement.addEventListener('shown.bs.toast', this.onShown)
    toastElement.addEventListener('hidden.bs.toast', this.onHidden)
  },
  methods: {
    /**
     * Trigger toast hide event.
     */
    hide(): void {
      const toastElement = this.$refs.toastRef as HTMLElement
      Toast.getOrCreateInstance(toastElement).hide()
    },
    /**
     * Hidden event.
     */
    onShown(): void {
      this.$emit('shown')
    },
    /**
     * Hidden event.
     */
    onHidden(): void {
      this.$emit('hidden')
    },
  },
})
</script>
