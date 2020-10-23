const API_KEY = "api_key=0c84539b7b6fe9bdba856aa5f27d88e0";
const BASE_URL = "https://api.themoviedb.org/3/";

export default {
    getTrendings() {
        return fetch(
            BASE_URL + "trending/movie/week?" + API_KEY
        ).then((response) => response.json().then((data) => data.results));
    },
    getFilmsBySearchQuery(query) {
        const searchString = `search/movie?query=${query}`;
        return fetch(BASE_URL + searchString + "&" + API_KEY)
            .then((response) => response.json())
            .then((data) => data.results);
    },
    getFilmDetails(id) {
        return fetch(
            BASE_URL + "movie/" + id + "?" + API_KEY
        ).then((response) => response.json());
    },
    getCastInfo(id) {
        return fetch(BASE_URL + "movie/" + id + "/credits?" + API_KEY)
            .then((response) => response.json())
            .then((result) => result.cast);
    },
    getFilmsReviews(id) {
        return fetch(BASE_URL + "movie/" + id + "/reviews?" + API_KEY)
            .then((response) => response.json())
    },
    getImageUrl(path) {
        return path
            ? `https://image.tmdb.org/t/p/original${path}`
            : "http://placehold.it/350x450";
    },
};
