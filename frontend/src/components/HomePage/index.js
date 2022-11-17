import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../store/articles";
import { updateProject } from "../../store/projects";
import { toggleEdit } from "../../store/editToggle";
import Article from "../Article";

function HomePage() {
    const dispatch = useDispatch();

    const { title } = useSelector(state => state.projects[1]);
    const articles = useSelector(state => state.projects[1].articles);
    const user = useSelector(state => state.session.user);

    const editMode = useSelector(state => state.edit);
    const [editTitle, setEditTitle] = useState(title);

    const toggleEditMode = () => {
        if (editMode) {
            //save
            dispatch(updateProject({ id: 1, title: editTitle }));
        }

        dispatch(toggleEdit());
    };

    const addArticle = () => {
        dispatch(createArticle({ projectId: 1 }));
    };

    useEffect(() => {
        if (editMode) dispatch(toggleEdit());
    }, [user]);

    useEffect(() => {
        setEditTitle(title);
    }, [title]);

    return (
        <section>
            <article>
                {editMode ? (
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
                    return <Article edit={editMode} article={article} key={article.id} />;
                })}
            {user && <button onClick={toggleEditMode}>{editMode ? "Save" : "Edit"}</button>}
            {user && editMode && <button onClick={addArticle}>Add Article</button>}
        </section>
    );
}

export default HomePage;
