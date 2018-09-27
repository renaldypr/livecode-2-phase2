<template>
  <div class="card  mb-3" style="max-width: 18rem;">
    <div class="card-body">
      <input type="text" placeholder="Search..." v-model="searchQuery">
      <button class="btn-info" v-on:click="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search: function() {
      this.$store.dispatch('search', this.searchQuery)
    }
  }
}
</script>

<style>

</style>
