import React from "react";
import { Link } from "react-router-dom";

import routes from '../../routes'

export default function Error() {
    return (
        <p>
            Oops. Something went wrong. Try to <Link to={routes.home}>refresh</Link> page
        </p>
    );
}
