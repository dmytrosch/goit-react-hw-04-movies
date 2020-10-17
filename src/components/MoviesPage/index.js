import React from "react";

import MoviesList from "../MoviesList";
import Error from "../Error";

import fetchMovies from "../../utils/fetchMovies";

export default class MoviesPage extends React.Component {
    state = {
        searchQuery: null,
        error: false,
        films: [],
        loading: false,
    };
    async componentDidUpdate(prevProps, prevState) {
        console.log(prevState.searchQuery, this.state.searchQuery);
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.toggleLoader();
            try {
                const searchResult = await fetchMovies.getFilmsBySearchQuery(
                    this.state.searchQuery
                );
                this.setState({ films: searchResult });
            } catch {
                this.setState({ error: true });
            } finally {
                this.toggleLoader();
            }
        }
    }
    toggleLoader() {
        this.setState((prevState) => ({
            loading: !prevState.loading,
        }));
    }

    searchHandler = (event) => {
        event.preventDefault();
        const query = event.target.elements.searchQuery.value;
        if (query) {
            this.setState({
                searchQuery: query,
            });
        }
    };
    render() {
        const { films, searchQuery, error, loading } = this.state;
        return (
            <>
                <form onSubmit={this.searchHandler}>
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Enter your query"
                    />
                    <button type="submit">Find</button>
                </form>
                {films.length === 0 && searchQuery && !loading && (
                    <p>
                        Sorry. We couldn't find any film by your query: "
                        {searchQuery}"
                    </p>
                )}
                {films.length > 0 && <MoviesList moviesList={films} />}
                {error && <Error />}
            </>
        );
    }
}
