import React from "react";
import { Link } from "react-router-dom";

function ProjectTile({ id, title, date, articles }) {
    return (
        <section>
            <Link to={`/projects/${id}`}>
                <article>
                    <h2>{title}</h2>
                    <p>
                        {new Date(date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </article>
            </Link>
        </section>
    );
}

export default ProjectTile;
