import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateArticle } from "../../store/articles";

function Article({ edit, article }) {
    const { id, text, image_link } = article;
    const [editText, setEditText] = useState(text);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!edit) dispatch(updateArticle({ id, editText, image_link }));
    }, [edit]);
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
