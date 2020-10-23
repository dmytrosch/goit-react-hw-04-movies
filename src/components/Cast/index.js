import React from "react";

import fetchMovies from "../../utils/fetchMovies";

import Error from "../Error";

export default class Cast extends React.Component {
    state = {
        castObjectsArr: null,
        loading: false,
        error: false,
    };

    async componentDidMount() {
        this.toggleLoader();
        try {
            const castObjectsArr = await fetchMovies.getCastInfo(
                this.props.match.params.movieId
            );
            this.setState({ castObjectsArr });
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
        const { loading, castObjectsArr, error } = this.state;

        return (
            <>
                <h2>Cast:</h2>
                {castObjectsArr && (
                    <ul>
                        {castObjectsArr.map((object) => (
                            <li key={object.id}>
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