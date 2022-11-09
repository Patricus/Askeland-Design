import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../store/projects";

function HomePage() {
    // const welcome = useSelector(state => state.projects[1]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProject(1));
    }, []);

    return <div>Home Page</div>;
}

export default HomePage;
