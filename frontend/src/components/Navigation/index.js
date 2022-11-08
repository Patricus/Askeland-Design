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
                <NavLink exact to="/">
                    Home Page
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/projects">
                    Project
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/contracting">
                    Contracting
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/contact">
                    Contact
                </NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
