<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: isActiveItem(item)}"
      >
        <router-link
          v-if="!isActiveItem(item)"
          :to="item.route"
          v-text="item.title"
        />
        <span v-else v-text="item.title" />
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BsBreadcrumb',
  props: {
    /**
     * List of breadcrumb items.
     */
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * Is active item
     *
     * @param item
     * @returns {boolean}
     */
    isActiveItem(item) {
      if (item.route === undefined || item.route === null) {
        return false
      }

      return item.route.name === this.$route.name
    },
  },
}
</script>
