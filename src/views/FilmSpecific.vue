<template>
    <div v-if="film">
        <img :src="film.Poster"/>
        <div>
            <h3>{{film.Title}}</h3>
            <p>Genre: {{film.Genre}}</p>
            <p>Year of Release: {{year}}</p>
            <p>Director: {{film.Director}}</p>
            <p>{{film.Plot}}</p>
        </div>
        <router-link :to="{path: '/'}">
            <button>Return</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'
import {DateTime} from 'luxon'

export default {
    data(){
        return{
            film: null,
        }
    },
    methods:{
        fetchFilm(){
            axios.get('https://www.omdbapi.com/?apikey=70a4c343&i=' + this.$route.params.id)
            .then(response => {
                this.film = response.data
            }).catch(response => console.log(response))
        },        
    },
    computed:{
        year(){
            return DateTime.fromString(this.film.Released, 'dd MMM yyyy').toFormat('yyyy')
        }
    },
    created(){
        this.fetchFilm()
    }
}
</script>