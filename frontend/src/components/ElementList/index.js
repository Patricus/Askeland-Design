import React from "react";
import { useDispatch } from "react-redux";
import { createArticle } from "../../store/articles";
import "./elementList.css";

function ElementList({ projectId, toggleList }) {
    const dispatch = useDispatch();

    const addArticle = () => {
        dispatch(createArticle({ projectId, text: "New Article" }));
        toggleList();
    };

    const addPicture = () => {
        // dispatch(createPicture()) //Create store and backend
        toggleList();
    };

    return (
        <section id="elementList">
            <ul>
                <li>
                    <button onClick={addArticle}>Text Article</button>
                </li>
                <li>
                    <button onClick={addPicture}>Single Picture</button>
                </li>
            </ul>
        </section>
    );
}

export default ElementList;
