<template>
  <div
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="classDialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="h5 modal-title" v-text="title" />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
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
  },
  emits: ['shown', 'hidden'],
  mounted() {
    const modalElement = this.$refs.modalRef
    Modal.getOrCreateInstance(modalElement).show()

    modalElement.addEventListener('shown.bs.modal', this.onShown)
    modalElement.addEventListener('hidden.bs.modal', this.onHidden)
  },
  methods: {
    /**
     * Trigger modal hide event.
     */
    hide() {
      Modal.getOrCreateInstance(this.$refs.modalRef).hide()
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
