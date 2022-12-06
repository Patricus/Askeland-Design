import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProject } from "../../store/projects";

function ProjectTile({ project, user }) {
    const { id, title, date, articles } = project;
    const dispatch = useDispatch();

    const removeProject = id => {
        dispatch(deleteProject(id));
    };
    return (
        <section>
            <Link to={`/projects/${id}`}>
                <article>
                    <h2>{title}</h2>
                    <p>{new Date(date).toUTCString().slice(0, -13)}</p>
                </article>
            </Link>
            {user && <button onClick={() => removeProject(project.id)}>Delete Project</button>}
        </section>
    );
}

export default ProjectTile;
