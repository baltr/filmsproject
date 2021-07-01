<template>
    <div v-if="itemList">
        <div v-if="itemList.Response==='True'">
            <div>
                <form class="catSelect">
                    <input class="radio" type="radio" value="All" id="All" v-model="selectedCategory" checked/>
                    <label for="All">All</label>
                    <input class="radio" type="radio" value="movie" id="Movies" v-model="selectedCategory"/>
                    <label for="Movies">Movies</label>
                    <input class="radio" type="radio" value="series" id="Series" v-model="selectedCategory"/>
                    <label for="Series">Series</label>
                    <input class="radio" type="radio" value="game" id="Videogames" v-model="selectedCategory"/>
                    <label for="Videogames">Videogames</label>
                </form>
            </div>
            <div class="itemList">
                <div class="item" v-for="item in itemList.Search" :key="item.imdbID">
                    <router-link :to="{path: `/${item.imdbID}`}">
                        <div class="imgwrapper">
                            <img v-if="item.Poster!=='N/A'" :src="item.Poster"/>
                            <img v-else src='../assets/missing.png'/>
                        </div>
                        <p>{{item.Title}}</p>
                    </router-link>
                </div>
            </div>
            <div id="pageNav" v-if="totalPages">
                <div class="fl-left back">
                    <button @click="firstPage" :disabled="selectedPage === 1">First</button>
                    <button @click="previousPage" :disabled="selectedPage === 1">Previous</button>
                </div>
                <form class="fl-left">
                    <div class="pageSelector" v-for="page in totalPages" :key="page">
                        <input class="radio" type="radio" :value="page" :id="page" v-model="selectedPage"/>
                        <label :for="page">{{page}}</label>
                    </div>
                </form>
                <div class="fl-left forward">
                    <button @click="nextPage" :disabled="selectedPage === totalPages">Next</button>
                    <button @click="lastPage" :disabled="selectedPage === totalPages">Last</button>
                </div>
            </div>
        </div>
        <div class="noresults" v-else>
            No results found
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectedPage: this.$store.getters.getActivePage,
            selectedCategory: this.$store.getters.getActiveCategory
        }
    },
    methods:{
        firstPage(){
            this.selectedPage = 1
        },
        previousPage(){
            this.selectedPage--
        },
        nextPage(){
            this.selectedPage++
        },
        lastPage(){
            this.selectedPage = this.totalPages
        }
    },
    computed:{
        totalPages(){
            return Math.ceil(this.$props.itemList.totalResults / 10)
        },
    },
    watch:{
        selectedCategory(){
            this.$store.commit('setActiveCategory', this.selectedCategory)
            this.$router.replace({query: {...this.$route.query, category: this.selectedCategory}})
            if (this.selectedPage===1) this.$store.dispatch('fetchSearchResults')
            this.selectedPage = 1
        },
        selectedPage(){
            this.$store.commit('setActivePage', this.selectedPage)
            this.$router.replace({query: {...this.$route.query, page: this.selectedPage}})
            this.$store.dispatch('fetchSearchResults')
        },
    },
    props:{
        itemList: {
            type: Object
        },
    }
}
</script>