import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../store/articles";
import { updateProject } from "../../store/projects";
import AddToProjectButton from "../AddToProjectButton";
import Article from "../Article";

function HomePage() {
    const dispatch = useDispatch();

    const { title } = useSelector(state => state.projects[1]);
    const articles = useSelector(state => state.projects[1].articles);
    const user = useSelector(state => state.session.user);

    const [editTitle, setEditTitle] = useState(title);
    const [editWelcome, setEditWelcome] = useState(false);

    const toggleEditModeMode = () => {
        if (editWelcome) {
            //save
            dispatch(updateProject({ id: 1, title: editTitle }));
        }

        setEditWelcome(editWelcome => !editWelcome);
    };

    const addArticle = () => {
        dispatch(createArticle({ projectId: 1 }));
    };

    useEffect(() => {
        if (editWelcome) toggleEditModeMode();
    }, [user]);

    useEffect(() => {
        setEditTitle(title);
    }, [title]);

    return (
        <section className="main">
            <article>
                {editWelcome ? (
                    <input
                        className="titleText"
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                ) : (
                    <h2 className="titleText">{title}</h2>
                )}
            </article>
            {articles &&
                Object.values(articles).map(article => {
                    return <Article edit={editWelcome} article={article} key={article.id} />;
                })}
            {user && <button onClick={toggleEditModeMode}>{editWelcome ? "Save" : "Edit"}</button>}
            {user && editWelcome && <AddToProjectButton projectId={1} />}
        </section>
    );
}

export default HomePage;
