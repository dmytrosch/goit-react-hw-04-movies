import React from "react";

import fetchMovies from "../../utils/fetchMovies";

import Error from "../Error";

export default class Cast extends React.Component {
    static movieId = this.props.match.params.movieId;
    state = { castObjects: null, loading: false, error: false };

    async componentDidMount() {
        this.toggleLoader();
        try {
            const castObjects = await fetchMovies.getCastInfo(this.movieId);
            this.setState({ castObjects });
        } catch {
            this.setState({ error: true });
        } finally {
            this.toggleLoader();
        }
    }
    toggleLoader() {
        this.setState((prevState) => ({
            loading: !prevState.loading,
        }));
    }

    render() {
        const { loading, castObjects, error } = this.state;

        return (
            <>
                {castObjects && (
                    <ul>
                        {castObjects.map((object) => (
                            <li>
                                <img
                                    src={fetchMovies.getImageUrl(
                                        object.profile_path
                                    )}
                                    alt=""
                                    width="50"
                                />
                                <h4>Name: {object.name}</h4>
                                <p>Chacacter: {object.character}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {error && <Error />}
                {loading && <p>Loading...</p>}
            </>
        );
    }
}
