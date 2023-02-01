import React from "react";
import { useDispatch } from "react-redux";
import { createArticle } from "../../store/articles";
import "./elementList.css";

function ElementList({ projectId, setShowList }) {
    const dispatch = useDispatch();
    const addArticle = () => {
        dispatch(createArticle({ projectId, text: "New Article" }));
        setShowList(false);
    };

    return (
        <section id="elementList">
            <ul>
                <li>
                    <button onClick={addArticle}>Text Article</button>
                </li>
                <li>
                    <button>Single Picture</button>
                </li>
            </ul>
        </section>
    );
}

export default ElementList;
