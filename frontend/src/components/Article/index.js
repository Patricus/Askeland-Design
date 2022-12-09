import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useDispatch } from "react-redux";
import { deleteArticle, updateArticle } from "../../store/articles";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import "./articles.css";

function Article({ edit, article }) {
    const { id, projectId, text: articleText, imageLink: articleImage } = article;
    const [text, setText] = useState(articleText);

    const [firstLoad, setFirstLoad] = useState(true);
    const dispatch = useDispatch();

    const quillModules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }, { font: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image"],
        ],
    };

    const quillFormats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];

    const imageHandler = async () => {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append("image", file);

            const fileName = file.name;

            // const res = await this.uploadFiles(file, fileName, quillObj);
        };
    };

    useEffect(() => {
        if (!edit && !firstLoad) dispatch(updateArticle({ id, text, projectId }));

        setFirstLoad(false);
    }, [edit]);

    const removeArticle = () => {
        dispatch(deleteArticle({ id, projectId }));
    };

    return (
        <article>
            {edit ? (
                <>
                    <ReactQuill
                        value={text}
                        onChange={setText}
                        modules={quillModules}
                        formats={quillFormats}
                        handlers={{ image: imageHandler }}
                        placeholder="Type text here"
                    />
                    <button onClick={removeArticle}>Delete Article</button>
                </>
            ) : (
                <>{parse(text)}</>
            )}
        </article>
    );
}

export default Article;
