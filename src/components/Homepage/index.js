import React from "react";

import MoviesList from "../MoviesList";
import fetchMovies from "../../utils/fetchMovies";

import Error from "../Error";

export default class HomePage extends React.Component {
    state = {
        movies: [],
        error: false,
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

    render() {
        const { movies, error } = this.state;
        return (
            <section>
                {movies && !error && (
                    <>
                        <h2>Trending today</h2>
                        <MoviesList moviesList={movies} location={this.props.location}/>
                    </>
                )}
                {error && <Error />}
            </section>
        );
    }
}
