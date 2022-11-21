import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteArticle, updateArticle } from "../../store/articles";

function Article({ edit, article }) {
    const { id, projectId, text: articleText, imageLink: articleImage } = article;
    const [text, setText] = useState(articleText);
    const [imageLink, setImageLink] = useState(articleImage);

    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!edit && !firstLoad) dispatch(updateArticle({ id, text: text, imageLink, projectId }));

        setFirstLoad(false);
    }, [edit]);

    const removeArticle = () => {
        console.log("TEST");
        dispatch(deleteArticle({ id, projectId }));
    };

    const CHANGE_IMAGE_BTN_STYLES = {
        display: "block",
    };

    return (
        <article>
            {edit ? (
                <>
                    {imageLink && <img src={imageLink} alt="" />}
                    <button style={CHANGE_IMAGE_BTN_STYLES}>
                        {imageLink ? `Change Image` : `Add Image`}
                    </button>
                    <textarea value={text} onChange={e => setText(e.target.value)} />
                    <button onClick={removeArticle}>Delete Article</button>
                </>
            ) : (
                <>
                    {imageLink && <img src={imageLink} alt="" />}
                    <p>{text}</p>
                </>
            )}
        </article>
    );
}

export default Article;
