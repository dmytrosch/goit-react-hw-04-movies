import React from "react";

import MoviesList from "../MoviesList";
import Error from "../Error";

import fetchMovies from "../../utils/fetchMovies";
import getQueryParams from "../../utils/getQueryParams";

export default class MoviesPage extends React.Component {
    state = {
        error: false,
        films: [],
        loading: false,
    };
    componentDidMount() {
        const parsedQuery = getQueryParams(this.props.location.search);
        if (parsedQuery.search) {
            this.findFilms(parsedQuery.search);
        }
    }

    componentDidUpdate(prevProps) {
        const parsedQuery = getQueryParams(this.props.location.search);
        const prevParsedQuery = getQueryParams(prevProps.location.search);
        if (parsedQuery.search !== prevParsedQuery.search) {
            this.findFilms(parsedQuery.search);
        }
    }
    toggleLoader() {
        this.setState((prevState) => ({
            loading: !prevState.loading,
        }));
    }
    async findFilms(query) {
        this.toggleLoader();
        try {
            const searchResult = await fetchMovies.getFilmsBySearchQuery(query);
            this.setState({ films: searchResult });
        } catch {
            this.setState({ error: true });
        } finally {
            this.toggleLoader();
        }
    }

    searchHandler = (event) => {
        event.preventDefault();
        const query = event.target.elements.searchQuery.value;
        if (query) {
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: `search=${query}`,
            });
        }
    };
    render() {
        const { films, error, loading } = this.state;
        const searchQuery = getQueryParams(this.props.location.search).search;
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
