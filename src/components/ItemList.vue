<template>
    <div>
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
                <button @click="selectedPage = 1" :disabled="selectedPage === 1">First</button>
                <button @click="selectedPage--" :disabled="selectedPage === 1">Previous</button>
            </div>
            <form class="fl-left">
                <div class="pageSelector" v-for="page in shownPages" :key="page">
                    <input class="radio" type="radio" :value="page" :id="page" v-model="selectedPage"/>
                    <label :for="page">{{page}}</label>
                </div>
            </form>
            <div class="fl-left forward">
                <button @click="selectedPage++" :disabled="selectedPage === totalPages">Next</button>
                <button @click="selectedPage = totalPages" :disabled="selectedPage === totalPages">Last</button>
            </div>
        </div>
    </div>
</template>

<script>
import lodash from 'lodash'

export default {
    data(){
        return{
            selectedPage: this.$store.getters.getActivePage,
            selectedCategory: this.$store.getters.getActiveCategory,
            itemsPerPage: 10
        }
    },
    computed:{
        totalPages(){
            return Math.ceil(this.$props.itemList.totalResults / this.itemsPerPage)
        },
        shownPages(){
            const page = this.selectedPage
            const totalPages = this.totalPages

            const pages = _.range(1, totalPages + 1)
            if (page < 3) return _.take(pages, 5)
            else if (page > totalPages - 3) return _.takeRight(pages, 5)
            else return _.slice(pages, page - 3, page + 2)
        }
    },
    watch:{
        selectedCategory(){
            this.$store.commit('setActiveCategory', this.selectedCategory)
            this.$router.replace({query: {...this.$route.query, category: this.selectedCategory, page: 1}})
            this.$store.dispatch('fetchSearchResults')
            this.selectedPage = 1
        },
        selectedPage(){
            this.$store.commit('setActivePage', this.selectedPage)
            this.$router.replace({query: {...this.$route.query, page: this.selectedPage}})
            this.$store.dispatch('fetchSearchResults')
        }
    },
    props:{
        itemList: {
            type: Object
        }
    }
}
</script>