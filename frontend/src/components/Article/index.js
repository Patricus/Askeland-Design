import React, { useState } from "react";

function Article({ edit, article }) {
    const { text, image_link } = article;
    const [editText, setEditText] = useState(text);
    return (
        <article>
            {image_link && <img src={image_link} alt="" />}
            {edit ? (
                <textarea value={editText} onChange={e => setEditText(e.target.value)} />
            ) : (
                <p>{text}</p>
            )}
        </article>
    );
}

export default Article;
