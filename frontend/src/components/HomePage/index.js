import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../store/articles";
import { updateProject } from "../../store/projects";
import Article from "../Article";

function HomePage() {
    const dispatch = useDispatch();

    const { title } = useSelector(state => state.projects[1]);
    const articles = useSelector(state => state.projects[1].articles);
    const user = useSelector(state => state.session.user);

    const [editWelcome, setEditWelcome] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    const toggleEdit = () => {
        if (editWelcome) {
            //save
            dispatch(updateProject({ id: 1, title: editTitle }));
        }

        setEditWelcome(() => !editWelcome);
    };

    const addArticle = () => {
        dispatch(createArticle({ projectId: 1 }));
    };

    useEffect(() => {
        setEditTitle(title);
    }, [title]);

    return (
        <section>
            <article>
                {editWelcome ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                ) : (
                    <h2>{title}</h2>
                )}
            </article>
            {articles &&
                Object.values(articles).map(article => {
                    return <Article edit={editWelcome} article={article} key={article.id} />;
                })}
            {user && <button onClick={toggleEdit}>{editWelcome ? "Save" : "Edit"}</button>}
            {user && editWelcome && <button onClick={addArticle}>Add Article</button>}
        </section>
    );
}

export default HomePage;
