import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../store/projects";
import Article from "../Article";

function HomePage() {
    const { title, articles } = useSelector(state => state.projects[1]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProject(1));
    }, [dispatch]);

    return (
        <section>
            <article>
                <h2>{title}</h2>
            </article>
            {articles &&
                Object.values(articles).map(article => {
                    return <Article article={article} key={article.id} />;
                })}
        </section>
    );
}

export default HomePage;
