import React from "react";

function Article({ article }) {
    const { text, image_link } = article;
    return (
        <article>
            <div>{text}</div>
            <div>{image_link}</div>
        </article>
    );
}

export default Article;
