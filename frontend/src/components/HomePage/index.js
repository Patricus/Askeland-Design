import React from "react";
import { useSelector } from "react-redux";
import Article from "../Article";

function HomePage() {
    const { title, articles } = useSelector(state => state.projects[1]);

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
