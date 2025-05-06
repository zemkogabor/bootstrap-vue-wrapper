<template>
  <div
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
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
  emits: ['show', 'shown', 'hide', 'hidden', 'hidePrevented'],
  mounted() {
    const modalElement = this.$refs.modalRef as HTMLElement
    Modal.getOrCreateInstance(modalElement).show()

    // https://getbootstrap.com/docs/5.3/components/modal/#events
    modalElement.addEventListener('show.bs.modal', (e) => this.$emit('show', e))
    modalElement.addEventListener('shown.bs.modal', (e) => this.$emit('shown', e))
    modalElement.addEventListener('hide.bs.modal', (e) => this.$emit('hide', e))
    modalElement.addEventListener('hidden.bs.modal', (e) => this.$emit('hidden', e))
    modalElement.addEventListener('hidePrevented.bs.modal', (e) => this.$emit('hidePrevented', e))
  },
  methods: {
    /**
     * Trigger modal hide event.
     */
    hide(): void {
      const modalElement = this.$refs.modalRef as HTMLElement

      Modal.getOrCreateInstance(modalElement).hide()
    },
  },
})
</script>
