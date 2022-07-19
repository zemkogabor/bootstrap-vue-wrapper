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

<script>
import { Offcanvas } from 'bootstrap'

export default {
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
    const offcanvasElemet = this.$refs.offcanvasRef
    Offcanvas.getOrCreateInstance(offcanvasElemet).show()

    offcanvasElemet.addEventListener('shown.bs.offcanvas', this.onShown)
    offcanvasElemet.addEventListener('hidden.bs.offcanvas', this.onHidden)
  },
  methods: {
    /**
     * Trigger offcanvas hide event.
     */
    hide() {
      Offcanvas.getOrCreateInstance(this.$refs.offcanvasRef).hide()
    },
    /**
     * Hidden event.
     */
    onShown() {
      this.$emit('shown')
    },
    /**
     * Hidden event.
     */
    onHidden() {
      this.$emit('hidden')
    },
  },
}
</script>
