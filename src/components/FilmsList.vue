<template>
    <div v-if="filmsList">
        <div>
            <form>
                <input class="radio" type="radio" value="All" id="All" v-model="selectedCategory" checked/>
                <label for="All">All</label>
                <input class="radio" type="radio" value="movie" id="Filmovi" v-model="selectedCategory"/>
                <label for="Filmovi">Films</label>
                <input class="radio" type="radio" value="series" id="Serije" v-model="selectedCategory"/>
                <label for="Serije">Series</label>
                <input class="radio" type="radio" value="game" id="Videoigre" v-model="selectedCategory"/>
                <label for="Videoigre">Videogames</label>
            </form>
        </div>
        <div v-for="film in this.$props.filmsList.Search" :key="film.imdbID">
            <router-link :to="{path: `/${film.imdbID}`}">
                <img v-if="film.Poster!=='N/A'" :src="film.Poster"/>
                <h3 v-else>IMAGE MISSING</h3>
                <p>{{film.Title}}</p>
            </router-link>
        </div>
        <div id="pageNav" v-if="totalPages > 0">
            <button @click="firstPage" :disabled="selectedPage === 1">First</button>
            <button @click="previousPage" :disabled="selectedPage === 1">Previous</button>
            <form>
                <div class="pageSelector" v-for="page in totalPages" :key="page">
                    <input class="radio" type="radio" :value="page" :id="page" v-model="selectedPage"/>
                    <label :for="page">{{page}}</label>
                </div>
            </form>
            <button @click="nextPage" :disabled="selectedPage === totalPages">Next</button>
            <button @click="lastPage" :disabled="selectedPage === totalPages">Last</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectedPage: 1,
            selectedCategory: 'All',
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
            return Math.ceil(this.$props.filmsList.totalResults / 10)
        },
    },
    watch:{
        selectedCategory(){
            this.$store.dispatch('changeSelectedCategory', this.selectedCategory)
        },
        selectedPage(){
            this.$store.dispatch('changeLastVisitedPage', this.selectedPage)
        }
    },
    props:{
        filmsList: {
            type: Object
        },
    }
}
</script>

<style lang="scss">
.radio{
    visibility: hidden;
    height: 0;
    width: 0;
}
.pageSelector{
    display: inline-block;
}
</style>