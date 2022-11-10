import React from "react";
import Article from "../Article";

function Project({ title, date, articles }) {
    return (
        <section>
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
            {articles &&
                Object.values(articles).map(article => {
                    return <Article article={article} key={article.id} />;
                })}
        </section>
    );
}

export default Project;
