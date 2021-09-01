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
            @click="onHeadClick(field.key)"
          >
            <slot name="tr">
              {{ field.label }}
              <i v-if="isActiveOrderBy(field.key) && isSortDescDefined()" :class="getSortIconClass()" />
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
              <div class="spinner-border spinner-border-sm text-dark" />
            </div>
          </slot>
        </td>
      </tr>
      <tr v-for="(item, key) in items" v-else :key="key">
        <template v-for="field in fields" :key="field.key">
          <td
            :class="{
              tdClass,
            }"
          >
            <slot
              v-if="field.key in item"
              name="td"
              :field="field.key"
              :item="item[field.key]"
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
      required: true,
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
  data() {
    return {
      /**
       * Sort is desc or not. Default not defined.
       */
      sortDesc: null,
    }
  },
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
     * Is sort defined?
     *
     * @returns {boolean}
     */
    isSortDescDefined() {
      return this.sortDesc !== null
    },
    /**
     * Sort icon class.
     *
     * @returns {string}
     */
    getSortIconClass() {
      return this.sortDesc ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
    },
    /**
     * Set sort desc.
     */
    setSortDesc(field) {
      if (this.isSortDescDefined() && !this.isOrderByChanged(field)) {
        this.sortDesc = !this.sortDesc
        return
      }

      this.sortDesc = false // default (first click) sort is ASC
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

      this.setSortDesc(field)

      this.$emit('orderChanged', { sortDesc: this.sortDesc, orderBy: field })
    },
  },
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
