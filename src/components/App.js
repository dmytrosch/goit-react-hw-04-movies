import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from '../routes';

import Layout from "./Layout";

const AsyncHomePage = lazy(() => import("./Homepage"));
const AsyncMoviesPage = lazy(() => import("./MoviesPage"));
const AsyncMovieDetailsPage = lazy(() => import("./MovieDetailsPage"));

export default class App extends React.Component {
    state = {};
    render() {
        return (
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route path={routes.home} exact component={AsyncHomePage} />
                        <Route
                            path={routes.movies}
                            exact
                            component={AsyncMoviesPage}
                        />
                        <Route
                            path={routes.movieDetails}
                            component={AsyncMovieDetailsPage}
                        />
                        <Redirect to="/" />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}
