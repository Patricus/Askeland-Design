import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Article from "../Article";

function ProjectDetails() {
    const { projectId } = useParams();

    const project = useSelector(state => state.projects[projectId]);

    return (
        <section>
            {project && (
                <article>
                    <h2>{project.title}</h2>
                    <p>
                        {new Date(project.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </article>
            )}
            {project &&
                project.articles &&
                Object.values(project.articles).map(article => {
                    return <Article article={article} key={article.id} />;
                })}
        </section>
    );
}

export default ProjectDetails;
