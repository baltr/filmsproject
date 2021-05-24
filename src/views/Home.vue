<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search..."/>
    <button @click="fetchBySearchQuery" class="searchButton">Search</button>
    <FilmsList :filmsList="filmsList"/>
  </div>
</template>

<script>
import FilmsList from '@/components/FilmsList.vue'

export default{
  data(){
    return{
      searchQuery: '',
    }
  },
  methods:{
    fetchBySearchQuery(){
      this.$store.dispatch('fetchBySearchQuery', this.searchQuery)
    }
  },
  computed:{
    filmsList(){
      return this.$store.getters.getFilmsList
    }
  },
  components:{
    FilmsList
  }
}
</script>

<style lang="scss">
.searchButton{
  background-color: rgb(48, 48, 102);
  color: white;
}
</style>