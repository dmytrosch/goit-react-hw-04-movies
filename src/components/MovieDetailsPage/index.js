import React from "react";
import { Link, Route } from "react-router-dom";

import fetchMovies from "../../utils/fetchMovies";

import Error from "../Error";
import Cast from '../Cast'

export default class MovieDetailsPage extends React.Component {
   static movieId = this.props.match.params.movieId;
    state = {
        filmInfo: "",
        error: false,
        loading: false,
    };
    async componentDidMount() {
        this.toggleLoader();
        try {
            const filmObj = await fetchMovies.getFilmDetails(this.movieId);
            this.setState({
                filmInfo: filmObj,
            });
        } catch {
            this.setState({
                error: true,
            });
        } finally {
            this.toggleLoader();
        }
    }
    toggleLoader() {
        this.setState((prevState) => ({
            loading: !prevState.loading,
        }));
    }
    getGenresString(arrayGenres) {
        const arrName = arrayGenres.map((genre) => genre.name);
        const string = arrName.join(" ");
        return string;
    }

    render() {
        const { error, loading, filmInfo } = this.state;
        const {
            original_title,
            vote_average,
            poster_path,
            overview,
            genres,
        } = filmInfo;
        return (
             <>
                {error && <Error />}
                {loading && <p>Loading...</p>}
                {filmInfo && (
                    <section>
                        <button>Go back</button>
                        <div>
                            <img
                                src={fetchMovies.getImageUrl(poster_path)}
                                alt=""
                                width="350"
                            />
                            <h2>Title film {original_title}</h2>
                            <p>User score: {`${vote_average * 10}%`}</p>
                            <h3>Overview:</h3>
                            <p>{overview}</p>
                            <h3>Genres</h3>
                            <p>{this.getGenresString(genres)}</p>
                        </div>
                        <hr/>
                        <div>
                            <h4>Additional information: </h4>
                            <ul>
                                <li>
                                    <Link to={`${this.props.match.url}/cast`}>Cast</Link>
                                </li>
                                <li>
                                    <Link to={`${this.props.match.url}/reviews`}>
                                        Reviews
                                    </Link>
                                </li>
                            </ul>
                            <Route path={`${this.props.match.path}/cast`} component={Cast}/>
                        </div>
                    </section>
                )}</>
            
 );
    }
}
