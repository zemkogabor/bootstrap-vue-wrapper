<template>
  <table class="table">
    <thead>
      <tr>
        <template v-for="field in fields" :key="field.key">
          <th
            :class="{
              'cursor-pointer': isSortableField(field),
              'text-decoration-underline': isActiveOrderBy(field.key),
              thClass,
            }"
            @click="onHeadClick(field)"
          >
            <slot name="tr">
              {{ field.label }}
              <i v-if="isActiveOrderBy(field.key) && sortDesc !== undefined" :class="getSortIconClass()" />
            </slot>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td :colspan="fields.length">
          <slot name="loading">
            <div class="d-flex justify-content-center p-2">
              <div class="spinner-border spinner-border-sm" />
            </div>
          </slot>
        </td>
      </tr>
      <tr v-else-if="items.length === 0">
        <td :colspan="fields.length">
          <slot name="empty">
            <div v-t="'table.empty_text'" class="text-center text-muted small" />
          </slot>
        </td>
      </tr>
      <tr
        v-for="(item, key) in items"
        v-else
        :key="key"
        :class="item.trClass"
      >
        <template v-for="field in fields" :key="field.key">
          <td
            :class="tdClass"
          >
            <slot
              :key="key"
              name="td"
              :field="field.key"
              :row="item"
              :value="field.key in item ? item[field.key] : null"
            >
              {{ item[field.key] }}
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Field {
  key: string;
  label: string;
  sort?: boolean;
}

export default defineComponent({
  name: 'BsTable',
  props: {
    /**
     * Field list
     */
    fields: {
      type: Array as PropType<Field[]>,
      required: true,
    },
    /**
     * Item list
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * Items is loading
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * Order by field name
     */
    orderBy: {
      type: String,
      default: undefined,
    },
    /**
     * Sort is descending or ascending
     */
    sortDesc: {
      type: Boolean,
      default: undefined,
    },
    /**
     * th element css lass
     */
    thClass: {
      type: String,
      default: undefined,
    },
    /**
     * td element css class
     */
    tdClass: {
      type: String,
      default: undefined,
    },
  },
  emits: ['orderChanged'],
  methods: {
    /**
     * Is order by active by field?
     *
     * @param field
     * @returns {boolean}
     */
    isActiveOrderBy(field): boolean {
      return field === this.orderBy
    },
    /**
     * Is field sortable?
     *
     * @param field
     * @returns {boolean}
     */
    isSortableField(field): boolean {
      return field.sort === undefined || field.sort
    },
    /**
     * Sort icon class.
     *
     * @returns {string}
     */
    getSortIconClass(): string {
      if (this.sortDesc === undefined) {
        throw new Error('Sort desc value is null, cannot calculate the sort icon!')
      }

      return this.sortDesc ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
    },
    /**
     * Calcuate sort desc value on click
     * Returns null if there is no sortDesc value.
     */
    calcSortDesc(field): boolean | null {
      if (this.sortDesc === undefined) {
        return null
      }

      if (!this.isOrderByChanged(field)) {
        // if the given order is already active, the sort will be the opposite
        return !this.sortDesc
      }

      return false // default (first click) sort is ASC
    },
    /**
     * Is order by changed?
     */
    isOrderByChanged(field): boolean {
      return this.orderBy !== field
    },
    /**
     * Table head clicked.
     */
    onHeadClick(field): void {
      if (!this.isSortableField(field)) {
        return
      }

      this.$emit('orderChanged', { sortDesc: this.calcSortDesc(field.key), orderBy: field.key })
    },
  },
})
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
