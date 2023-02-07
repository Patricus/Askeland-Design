import React, { useState } from "react";
import ElementList from "../ElementList";
import "./AddToProjectButton.css";

function AddToProjectButton({ projectId }) {
    const [showList, setShowList] = useState(false);

    const toggleList = () => {
        const buttonText = document.querySelector("#elementListText");

        if (showList) buttonText.classList.remove("open");
        else buttonText.classList.add("open");

        setShowList(showList => !showList);
    };

    return (
        <span style={{ position: "relative" }}>
            <button onClick={toggleList}>
                <span id="elementListText"> + </span>
            </button>
            {showList && <ElementList projectId={projectId} toggleList={toggleList} />}
        </span>
    );
}

export default AddToProjectButton;
