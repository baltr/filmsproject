<template>
  <div>
    <input class="search" type="text" v-model="searchQuery" placeholder="Search..."/>
    <button @click="fetchItemList" class="searchButton" :disabled="searchQuery.length < 3">Search</button>
    <div v-if="itemList">
      <div v-if="itemList.Response === 'True'">
        <ItemList :itemList="itemList"/>
      </div>
      <div class="noresults" v-else>
        No results found
      </div>
    </div>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default{
  data(){
    return{
      searchQuery: '',
    }
  },
  methods:{
    fetchItemList(){
      if (this.searchQuery !== this.$store.getters.getSearchQuery || this.itemList.Response !== 'True'){
        this.$store.commit('setSearchQuery', this.searchQuery)
        this.$store.commit('setActiveCategory', 'All')
        this.$store.dispatch('fetchSearchResults')
        this.$router.replace({query: {
          search: this.searchQuery,
          category: 'All',
          page: 1
        }})
      }
    }
  },
  computed:{
    itemList(){
      return this.$store.getters.getItemList
    }
  },
  created(){
    const queryPage = this.$route.query.page
    const queryCategory = this.$route.query.category
    const querySearch = this.$route.query.search

    if (queryCategory && queryCategory !== this.$store.getters.getActiveCategory) this.$store.commit('setActiveCategory', queryCategory)
    if (queryPage && queryPage != this.$store.getters.getActivePage) this.$store.commit('setActivePage', queryPage)
    if (querySearch && querySearch !== this.$store.getters.getSearchQuery) {
      this.$store.commit('setSearchQuery', querySearch)
      this.$store.dispatch('fetchSearchResults')
    }
    this.searchQuery = this.$store.getters.getSearchQuery
  },
  components:{
    ItemList
  }
}
</script>