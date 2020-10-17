import React from "react";
import { Link } from "react-router-dom";

export default function MoviesList({ moviesList }) {
    return (
        <div>
            <ul>
                {moviesList.map((film) => (
                    <li key={film.id}>
                        <Link to={`/movies/${film.id}`}>
                            {film.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
