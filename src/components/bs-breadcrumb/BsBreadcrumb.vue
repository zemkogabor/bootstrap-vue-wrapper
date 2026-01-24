<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: !isRouteAvailable(item)}"
      >
        <router-link
          v-if="isRouteAvailable(item)"
          :to="item.route"
        >
          {{ item.title }}
        </router-link>
        <span v-else v-text="item.title" />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type BreadcrumbItem from '@/types/BreadcrumbItem.ts'

export default defineComponent({
  name: 'BsBreadcrumb',
  props: {
    /**
     * List of breadcrumb items.
     */
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      required: true,
    },
  },
  methods: {
    /**
     * Is route available
     *
     * @param item
     * @returns {boolean}
     */
    isRouteAvailable(item: BreadcrumbItem): boolean {
      return item.route !== undefined
    },
  },
})
</script>
