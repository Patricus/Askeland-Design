import React from "react";

function Article({ article }) {
    const { text, image_link } = article;
    return (
        <article>
            <div>{text}</div>
            <img src={image_link} alt="" />
        </article>
    );
}

export default Article;
