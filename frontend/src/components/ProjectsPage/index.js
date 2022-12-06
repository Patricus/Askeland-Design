import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjects } from "../../store/projects";
import ProjectTile from "../ProjectTile";

function ProjectsPage() {
    const projects = useSelector(state => state.projects);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const newProject = () => {
        dispatch(createProject({ title: "New Project", date: new Date() }));
    };

    return (
        <section>
            {projects &&
                Object.values(projects)
                    .slice(1)
                    .map(project => {
                        return <ProjectTile project={project} user={user} key={project.id} />;
                    })}
            {user && <button onClick={newProject}>Create Project</button>}
        </section>
    );
}

export default ProjectsPage;
