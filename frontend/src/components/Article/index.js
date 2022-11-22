import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { deleteArticle, updateArticle } from "../../store/articles";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

function Article({ edit, article }) {
    const { id, projectId, text: articleText, imageLink: articleImage } = article;
    const [text, setText] = useState(articleText);
    const [imageLink, setImageLink] = useState(articleImage);

    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();

    const quillModules = {
        toolbar: [
            [{ header: [2, 3, 4] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    useEffect(() => {
        if (!edit && !firstLoad) dispatch(updateArticle({ id, text: text, imageLink, projectId }));

        setFirstLoad(false);
    }, [edit]);

    const removeArticle = () => {
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
                    <ReactQuill value={text} onChange={setText} modules={quillModules} />
                    <button onClick={removeArticle}>Delete Article</button>
                </>
            ) : (
                <>
                    {imageLink && <img src={imageLink} alt="" />}
                    {parse(text)}
                </>
            )}
        </article>
    );
}

export default Article;
