<template>
  <table class="table">
    <thead>
      <tr>
        <template v-for="field in fields" :key="field.key">
          <th
            :class="{
              'cursor-pointer': isSortableField(field),
              'active-order-by': isActiveOrderBy(field.key),
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
      <tr v-if="isLoading && !skeletonLoading">
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
            <div v-if="emptyText !== undefined" class="text-center text-muted small" v-text="emptyText" />
          </slot>
        </td>
      </tr>
      <template
        v-for="(item, key) in items"
        v-else
        :key="key"
      >
        <tr
          :class="[item.trClass || '', { 'cursor-pointer': rowClickable }]"
          :data-id="item.id"
          @click="$emit('rowClicked', item)"
        >
          <template v-for="field in fields" :key="field.key">
            <td
              v-if="!isLoading"
              :class="field.tdClass || tdClass"
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
            <td v-else-if="skeletonLoading">
              <div class="bs-skeleton-line" />
            </td>
          </template>
        </tr>
        <tr v-if="item._showRowDetails && !isLoading">
          <td :colspan="fields.length">
            <slot name="row-details" :row="item" />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type Field from '@/types/Field.ts'
import type { TableRowMeta } from '@/types/TableRow.ts'

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<Array<Record<string, any> & TableRowMeta>>,
      required: true,
    },
    /**
     * Items loading
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
    /**
     * row is clickable
     */
    rowClickable: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: undefined,
    },
    sortAscIconClass: {
      type: String,
      default: 'bi bi-caret-down-fill',
    },
    sortDescIconClass: {
      type: String,
      default: 'bi bi-caret-up-fill',
    },
    /**
     * Use skeleton loading instead of spinner when isLoading is true
     */
    skeletonLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['orderChanged', 'rowClicked'],
  methods: {
    /**
     * Is order by active by field?
     *
     * @param fieldKey
     * @returns {boolean}
     */
    isActiveOrderBy(fieldKey : string): boolean {
      return fieldKey === this.orderBy
    },
    /**
     * Is field sortable?
     *
     * @param field
     * @returns {boolean}
     */
    isSortableField(field : Field): boolean {
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

      return this.sortDesc ? this.sortDescIconClass : this.sortAscIconClass
    },
    /**
     * Calcuate sort desc value on click
     * Returns null if there is no sortDesc value.
     */
    calcSortDesc(fieldKey : string): boolean | null {
      if (this.sortDesc === undefined) {
        return null
      }

      if (!this.isOrderByChanged(fieldKey)) {
        // if the given order is already active, the sort will be the opposite
        return !this.sortDesc
      }

      return false // default (first click) sort is ASC
    },
    /**
     * Is order by changed?
     */
    isOrderByChanged(fieldKey : string): boolean {
      return this.orderBy !== fieldKey
    },
    /**
     * Table head clicked.
     */
    onHeadClick(field : Field): void {
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

.bs-skeleton-line {
  display: block;
  width: 100%;
  height: 0.85em;
  border-radius: 999px;
  margin: 0.25rem 0;

  --sk-base: color-mix(in srgb, var(--bs-body-color) 10%, transparent);
  --sk-shine: color-mix(in srgb, var(--bs-body-color) 18%, transparent);

  background-image: linear-gradient(
      90deg,
      var(--sk-base) 0%,
      var(--sk-shine) 20%,
      var(--sk-base) 40%,
      var(--sk-base) 100%
  );
  background-size: 200% 100%;
  background-position: 100% 0;

  animation: bs-skeleton-shimmer 1.15s ease-in-out infinite;
}

/* If color-mix is not supported, fallback to a simple gradient with hardcoded colors */
@supports not (color: color-mix(in srgb, black, white)) {
  .bs-skeleton-line {
    background-image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.08) 0%,
        rgba(0, 0, 0, 0.14) 20%,
        rgba(0, 0, 0, 0.08) 40%,
        rgba(0, 0, 0, 0.08) 100%
    );
  }
}

@keyframes bs-skeleton-shimmer {
  to {
    background-position: -100% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bs-skeleton-line {
    animation: none;
  }
}
</style>
