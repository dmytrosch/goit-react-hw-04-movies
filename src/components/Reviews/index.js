import React from "react";

import fetchMovies from "../../utils/fetchMovies";

import Error from "../Error";

export default class Reviews extends React.Component {
    state = {
        loading: false,
        error: false,
        reviewsArr: [],
        areReviews: false,
    };
    async componentDidMount() {
        this.toggleLoader();
        try {
            const getReviewsInfo = await fetchMovies.getFilmsReviews(
                this.props.match.params.movieId
            );
            const { total_results, results } = getReviewsInfo;
            total_results > 0 &&
                this.setState({ areReviews: true, reviewsArr: results });
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
        const { loading, error, reviewsArr, areReviews } = this.state;
        return (
            <>
                <h2>Reviews:</h2>
                {error && <Error />}
                {loading && <p>Loading...</p>}
                {!loading && !areReviews && (
                    <p>This movie hasn't any reviews.</p>
                )}
                {reviewsArr && (
                    <ul>
                        {reviewsArr.map((review) => (
                            <li key={review.id}>
                                <h4>Author: {review.author}</h4>
                                <h5>Review: </h5>
                                <p>{review.content}</p>
                                <a href={review.url}>Read more...</a>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        );
    }
}
