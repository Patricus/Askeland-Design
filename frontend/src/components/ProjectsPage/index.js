import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/projects";
import Project from "../Project";

function ProjectsPage() {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <>
            {projects &&
                Object.values(projects)
                    .slice(1)
                    .map(project => {
                        return <Project {...project} key={project.id} />;
                    })}
        </>
    );
}

export default ProjectsPage;
