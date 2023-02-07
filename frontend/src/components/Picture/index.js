import React, { useState } from "react";

function Picture({ photoURL }) {
    const [picURL, setPicURL] = useState(photoURL);

    return (
        <>
            {picURL ? (
                <img src={picURL} alt="" />
            ) : (
                <>
                    <label className="custom-file-upload">
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        {image ? image.name : `Upload Photo`}
                    </label>
                    <button>Post</button>
                </>
            )}
        </>
    );
}

export default Picture;
