import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import { getProjects } from "./store/projects";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetails from "./components/ProjectDetails";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getProjects())
            .then(dispatch(sessionActions.restoreUser()))
            .then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Routes>
                    <Route path="/login" element={<LoginFormPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                </Routes>
            )}
        </>
    );
}

export default App;
