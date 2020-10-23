import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import routes from "../../routes";

const styles = {
    regLink: {
        color: "grey",
        textDecoration: "none",
    },
    actvLink: {
        color: "red",
    },
    navContainer: {
        display: "flex",
        fontSize: "20px",
        justifyContent: "space-between",
        width: "150px",
        listStyle: "none",
    },
};

export default function Layout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <ul style={styles.navContainer}>
                        <li>
                            <NavLink
                                exact
                                to={routes.home}
                                style={styles.regLink}
                                activeStyle={styles.actvLink}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={routes.movies}
                                style={styles.regLink}
                                activeStyle={styles.actvLink}
                            >
                                Movies
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <hr />
            <main>{children}</main>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.object.isRequired,
};
