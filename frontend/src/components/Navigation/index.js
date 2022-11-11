import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton.js";
import LogoTitle from "./LogoTitle.js";
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
        <section className="sidebar">
            <LogoTitle />
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home Page</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contracting">Contracting</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    {isLoaded && sessionLinks}
                </ul>
            </nav>
        </section>
    );
}

export default Navigation;
