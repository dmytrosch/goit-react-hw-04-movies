import React from "react";

import MoviesList from "../MoviesList";
import fetchMovies from "../../utils/fetchMovies";

import Error from '../Error'

export default class HomePage extends React.Component {
    state = {
        movies: [],
        error: false,
        searchQuery: null,
    };
    async getPopularMovies() {
        try {
            const moviesArr = await fetchMovies.getTrendings();
            this.setState({ movies: moviesArr });
        } catch {
            this.setState({
                error: true,
            });
        }
    }
    componentDidMount() {
        this.getPopularMovies();
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.searchQuery !== this.state.searchQuery){
            // this.props.history.push.
        }
    }
    

    searchHandler = (event) => {
        const query = event.target.elements.searchQuery.value;
        this.setState({
            searchQuery: query,
        });
    };

    render() {
        const { movies, error } = this.state;
        return (
            <section>
                {!error && (
                    <form onSubmit={this.searchHandler}>
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Enter your query"
                        />
                        <button type="submit">Find</button>
                    </form>
                )}
                {movies && (
                    <>
                        <h2>Trending today</h2>
                        <MoviesList moviesList={movies} />
                    </>
                )}
                {error && <Error/>}
            </section>
        );
    }
}
