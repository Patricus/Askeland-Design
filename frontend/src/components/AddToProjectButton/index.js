import React, { useState } from "react";
import ElementList from "../ElementList";

function AddToProjectButton({ projectId }) {
    const [showList, setShowList] = useState(false);

    return (
        <span style={{ position: "relative" }}>
            <button onClick={() => setShowList(showList => !showList)}> + </button>
            {showList && <ElementList projectId={projectId} setShowList={setShowList} />}
        </span>
    );
}

export default AddToProjectButton;
