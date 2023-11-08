<template>
  <table class="table">
    <thead>
      <tr>
        <template v-for="field in fields" :key="field.key">
          <th
            :class="{
              'cursor-pointer': isSortableField(field),
              thClass,
            }"
            @click="onHeadClick(field)"
          >
            <slot name="tr">
              {{ field.label }}
              <i v-if="isActiveOrderBy(field.key) && this.sortDesc !== null" :class="getSortIconClass()" />
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
            <!-- "item" prop deprecated, its name is too general, "value" should be used instead -->
            <slot
              :key="key"
              name="td"
              :field="field.key"
              :row="item"
              :item="field.key in item ? item[field.key] : null"
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

<script>
/**
 * @typedef {{
 *   key: String,
 *   label: String,
 *   ?sort: Boolean,
 *   }[],
 * }} Field
 */
export default {
  name: 'TableList',
  props: {
    /**
     * Field list
     */
    fields: {
      /** @type {{ new(): Field[] }} */
      type: Array,
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
      default: null,
    },
    /**
     * Sort is descending or ascending
     */
    sortDesc: {
      type: Boolean,
      default: null,
    },
    /**
     * th element css lass
     */
    thClass: {
      type: String,
      default: null,
    },
    /**
     * td element css class
     */
    tdClass: {
      type: String,
      default: null,
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
    isActiveOrderBy(field) {
      return field === this.orderBy
    },
    /**
     * Is field sortable?
     *
     * @param field
     * @returns {boolean}
     */
    isSortableField(field) {
      return field.sort === undefined || field.sort
    },
    /**
     * Sort icon class.
     *
     * @returns {string}
     */
    getSortIconClass() {
      if (this.sortDesc === null) {
        throw new Error('Sort desc value is null, cannot calculate the sort icon!')
      }

      return this.sortDesc ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
    },
    /**
     * Calcuate sort desc value on click
     * Returns null if there is no sortDesc value.
     */
    calcSortDesc(field) {
      if (this.sortDesc === null) {
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
    isOrderByChanged(field) {
      return this.orderBy !== field
    },
    /**
     * Table head clicked.
     */
    onHeadClick(field) {
      if (!this.isSortableField(field)) {
        return
      }

      this.$emit('orderChanged', { sortDesc: this.calcSortDesc(field.key), orderBy: field.key })
    },
  },
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
