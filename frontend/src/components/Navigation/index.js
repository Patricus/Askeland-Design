import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton.js";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = <ProfileButton user={sessionUser} />;
    } else {
        sessionLinks = (
            <li>
                <NavLink to="/login">Log In</NavLink>
            </li>
        );
    }

    return (
        <ul>
            <li>
                <NavLink to="/">Home Page</NavLink>
            </li>
            <li>
                <NavLink to="/projects">Project</NavLink>
            </li>
            <li>
                <NavLink to="/contracting">Contracting</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
