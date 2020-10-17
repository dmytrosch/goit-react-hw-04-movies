import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <p>
            Oops. Something went wrong. Try to <Link to="/">refresh</Link> page
        </p>
    );
}
