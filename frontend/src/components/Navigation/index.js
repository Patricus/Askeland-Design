import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import LogoTitle from "./LogoTitle.js";
import "./Navigation.css";
import MobileMenu from "./MobileMenu.js";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = <button onClick={logout}>Log Out</button>;
    } else {
        sessionLinks = (
            <li>
                <NavLink to="/login">Log In</NavLink>
            </li>
        );
    }

    return (
        <section className="sidebar">
            <article className="slider">
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
                <MobileMenu />
            </article>
        </section>
    );
}

export default Navigation;
