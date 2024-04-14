<template>
  <div
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="classDialog">
      <div class="modal-content">
        <div v-if="!hideHeader" class="modal-header">
          <slot name="header">
            <div class="h5 modal-title" v-text="title" />
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            />
          </slot>
        </div>
        <div v-if="!hideBody" class="modal-body">
          <slot name="body" />
        </div>
        <div v-if="!hideFooter" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BsModal',
  props: {
    /**
     * Modal title
     */
    title: {
      type: String,
      required: true,
    },
    classDialog: {
      type: [String, Object],
      default: null,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    hideBody: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['shown', 'hidden'],
  mounted() {
    const modalElement = this.$refs.modalRef as HTMLElement
    Modal.getOrCreateInstance(modalElement).show()

    modalElement.addEventListener('shown.bs.modal', this.onShown)
    modalElement.addEventListener('hidden.bs.modal', this.onHidden)
  },
  methods: {
    /**
     * Trigger modal hide event.
     */
    hide(): void {
      const modalElement = this.$refs.modalRef as HTMLElement

      Modal.getOrCreateInstance(modalElement).hide()
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
