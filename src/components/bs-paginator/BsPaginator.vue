<template>
  <nav>
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: isPageActive(1) }"
      >
        <div
          class="page-link"
          @click="onPageClick(1)"
          v-text="firstPageLabel"
        />
      </li>
      <li
        class="page-item"
        :class="{ disabled: isPageActive(1) }"
      >
        <div
          class="page-link"
          @click="onPageClick(1)"
          v-text="previousPageLabel"
        />
      </li>
      <li
        v-for="(page, index) in getVisiblePages()"
        :key="index"
        class="page-item"
        :class="{
          active: isPageActive(page),
        }"
      >
        <div
          class="page-link"
          @click="onPageClick(page)"
          v-text="page"
        />
      </li>
      <li
        class="page-item"
        :class="{ disabled: isPageActive(getPageCount()) }"
      >
        <div
          class="page-link"
          @click="onPageClick(currentPage + 1)"
          v-text="nextPageLabel"
        />
      </li>
      <li
        class="page-item"
        :class="{ disabled: isPageActive(getPageCount()) }"
      >
        <div
          class="page-link"
          @click="onPageClick(getPageCount())"
          v-text="lastPageLabel"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BsPaginator',
  props: {
    /**
     * Total count of items.
     */
    totalCount: {
      type: Number,
      required: true,
    },
    /**
     * Page size
     */
    pageSize: {
      type: Number,
      required: true,
    },
    /**
     * Current page
     */
    currentPage: {
      type: Number,
      required: true,
    },
    /**
     * Max visible page
     */
    maxVisiblePage: {
      type: Number,
      default: 5,
    },
    /**
     * First page label
     */
    firstPageLabel: {
      type: String,
      default: '«',
    },
    /**
     * Previous page label
     */
    previousPageLabel: {
      type: String,
      default: '‹',
    },
    /**
     * Next page label
     */
    nextPageLabel: {
      type: String,
      default: '›',
    },
    /**
     * Last page label
     */
    lastPageLabel: {
      type: String,
      default: '»',
    },
  },
  emits: ['pageChanged'],
  methods: {
    /**
     * Count of pages
     *
     * @returns {number}
     */
    getPageCount() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
    /**
     * Visible page list
     *
     * @returns {*[]}
     */
    getVisiblePages() {
      const visiblePages = []
      const pageRange = this.getPageRange()
      for (let i = pageRange.beginPage; i <= pageRange.endPage; i += 1) {
        visiblePages.push(i + 1)
      }

      return visiblePages
    },
    /**
     * Is page active, or not
     *
     * @param page
     * @returns {boolean}
     */
    isPageActive(page) {
      return page === this.currentPage
    },
    /**
     * On page click
     */
    onPageClick(page) {
      if (this.isPageActive(page)) {
        return
      }

      this.$emit('pageChanged', page)
    },
    /**
     * Page range, example: 3 available page, current page 3, range is: [1, 3] (zero-based)
     *
     * @returns {{beginPage: number, endPage: number}}
     */
    getPageRange() {
      let beginPage = Math.max(0, this.currentPage - (this.maxVisiblePage / 2))
      let endPage = beginPage + this.maxVisiblePage - 1

      if (endPage >= this.getPageCount()) {
        endPage = this.getPageCount() - 1
        beginPage = Math.max(0, endPage - this.maxVisiblePage + 1)
      }

      return {
        beginPage: Math.floor(beginPage),
        endPage: Math.floor(endPage),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-link {
  cursor: pointer;
}
</style>