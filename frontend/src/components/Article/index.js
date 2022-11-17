import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateArticle } from "../../store/articles";

function Article({ edit, article }) {
    const { id, text, imageLink } = article;
    const [editText, setEditText] = useState(text);
    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!edit && !firstLoad) dispatch(updateArticle({ id, text: editText, imageLink }));

        setFirstLoad(false);
    }, [edit]);

    return (
        <article>
            {imageLink && <img src={imageLink} alt="" />}
            {edit ? (
                <textarea value={editText} onChange={e => setEditText(e.target.value)} />
            ) : (
                <p>{text}</p>
            )}
        </article>
    );
}

export default Article;
