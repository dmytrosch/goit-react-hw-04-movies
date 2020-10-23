import React from "react";
import { Link } from "react-router-dom";

import routes from '../../routes'

export default function MoviesList({ moviesList, location }) {
    return (
        <div>
            <ul>
                {moviesList.map((film) => (
                    <li key={film.id}>
                        <Link
                            to={{
                                pathname: `${routes.movies}/${film.id}`,
                                state: { from: location },
                            }}
                        >
                            {film.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
