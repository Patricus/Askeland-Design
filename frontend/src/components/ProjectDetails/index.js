import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createArticle } from "../../store/articles";
import { updateProject } from "../../store/projects";
import Article from "../Article";

function ProjectDetails() {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    const project = useSelector(state => state.projects[projectId]);
    const articles = useSelector(state => state.projects[projectId].articles);
    const user = useSelector(state => state.session.user);
    const [editProject, setEditProject] = useState(false);
    const [editTitle, setEditTitle] = useState(project.title);
    const [editDate, setEditDate] = useState(project.date);

    const toggleEditModeMode = () => {
        if (editProject) {
            //save
            dispatch(
                updateProject({
                    id: project.id,
                    title: editTitle,
                    date: editDate,
                })
            );
        }

        setEditProject(editProject => !editProject);
    };

    const addArticle = () => {
        dispatch(createArticle({ projectId, text: "New Article" }));
    };

    return (
        <section>
            {project && (
                <article>
                    {editProject ? (
                        <>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                            />
                            <input
                                type="date"
                                value={editDate}
                                onChange={e => setEditDate(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <h2>{project.title}</h2>
                            <p>{new Date(project.date).toUTCString().slice(0, -13)}</p>
                        </>
                    )}
                </article>
            )}
            {articles &&
                Object.values(articles).map(article => {
                    return <Article edit={editProject} article={article} key={article.id} />;
                })}
            {user && <button onClick={toggleEditModeMode}>{editProject ? `Save` : `Edit`}</button>}
            {user && editProject && <button onClick={addArticle}> + </button>}
        </section>
    );
}

export default ProjectDetails;
