<template>
  <div
    ref="offcanvasRef"
    class="offcanvas"
    tabindex="-1"
    aria-labelledby="offcanvasTitle"
  >
    <div class="offcanvas-header">
      <slot name="header">
        <div id="offcanvasTitle" class="h5 mb-0" v-text="title" />
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        />
      </slot>
    </div>
    <div class="offcanvas-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Offcanvas } from 'bootstrap'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BsOffcanvas',
  props: {
    /**
     * Offcanvas title
     */
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['shown', 'hidden'],
  mounted() {
    const offcanvasElement = this.$refs.offcanvasRef as HTMLElement
    Offcanvas.getOrCreateInstance(offcanvasElement).show()

    offcanvasElement.addEventListener('shown.bs.offcanvas', this.onShown)
    offcanvasElement.addEventListener('hidden.bs.offcanvas', this.onHidden)
  },
  methods: {
    /**
     * Trigger offcanvas hide event.
     */
    hide(): void {
      const offcanvasElement = this.$refs.offcanvasRef as HTMLElement
      Offcanvas.getOrCreateInstance(offcanvasElement).hide()
    },
    /**
     * Shown event.
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
