<template>
  <div>
    <input class="search" type="text" v-model="searchQuery" placeholder="Search..."/>
    <button @click="fetchItemList" class="searchButton" :disabled="searchQuery.length < 3">Search</button>
    <ItemList :itemList="itemList"/>
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
      if (this.searchQuery !== this.$store.getters.getSearchQuery || this.itemList.Response!=='True'){
        this.$store.commit('setSearchQuery', this.searchQuery)
        this.$store.commit('setActiveCategory', 'All')
        this.$store.commit('setActivePage', 1)
        this.$store.dispatch('fetchSearchResults')
        this.$router.replace({query: {
          search: this.searchQuery,
          category: this.$store.getters.getActiveCategory,
          page: this.$store.getters.getActivePage
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
    if (queryCategory!==this.$store.getters.getActiveCategory && queryCategory!==undefined) this.$store.commit('setActiveCategory', queryCategory)
    if (queryPage!=this.$store.getters.getActivePage && queryPage!==undefined) this.$store.commit('setActivePage', queryPage)
    if (querySearch!==this.$store.getters.getSearchQuery && querySearch!==undefined) {
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