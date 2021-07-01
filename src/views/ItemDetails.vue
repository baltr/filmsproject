<template>
    <div>
        <div v-if="item">
            <div class="detailsWrapper" v-if="item.Response === 'True'">
                <img v-if="item.Poster!=='N/A'" :src="item.Poster"/>
                <img v-else src='../assets/missing.png'/>
                <div class="details">
                    <h3>{{item.Title}}</h3>
                    <p>Genre: {{item.Genre}}</p>
                    <p>Year of Release: {{year}}</p>
                    <p>Director: {{item.Director}}</p>
                    <p>{{item.Plot}}</p>
                </div>
            </div>
            <div class="noresults" v-else>
                Cannot find media under that ID
            </div>
        </div>
        <router-link :to="{path: '/', query: computedQuery}">
            <button class="return">Return</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'
import {DateTime} from 'luxon'

export default {
    data(){
        return{
            item: null,
        }
    },
    methods:{
        fetchItem(){
            axios.get('https://www.omdbapi.com/?apikey=70a4c343&i=' + this.$route.params.id)
            .then(response => {
                this.item = response.data
            }).catch(response => console.log(response))
        },        
    },
    computed:{
        year(){
            if (this.item.Response === "True") return DateTime.fromString(this.item.Released, 'dd MMM yyyy').toFormat('yyyy')
        },
        computedQuery(){
            return {
                search: this.$store.getters.getSearchQuery,
                category: this.$store.getters.getActiveCategory,
                page: this.$store.getters.getActivePage
            }
        }
    },
    created(){
        this.fetchItem()
    }
}
</script>

<style lang="scss">
@import "../assets/styles/_details.scss"
</style>