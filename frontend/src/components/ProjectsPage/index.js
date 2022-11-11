import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/projects";
import ProjectTile from "../ProjectTile";

function ProjectsPage() {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <section>
            {projects &&
                Object.values(projects)
                    .slice(1)
                    .map(project => {
                        return <ProjectTile {...project} key={project.id} />;
                    })}
        </section>
    );
}

export default ProjectsPage;
