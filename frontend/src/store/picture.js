import { csrfFetch } from "./csrf";

const NEW_PICTURE = "pictures/newPicture";
const UPDATE_PICTURE = "pictures/editPicture";
const DELETE_PICTURE = "pictures/deletePicture";

const storeNewPicture = picture => {
    return {
        type: NEW_PICTURE,
        payload: picture,
    };
};

const storeEditPicture = picture => {
    return {
        type: UPDATE_PICTURE,
        payload: picture,
    };
};

const storeDeletePicture = pictureId => {
    return {
        type: DELETE_PICTURE,
        payload: pictureId,
    };
};

export const createPicture = picture => async dispatch => {
    const res = await csrfFetch(`/api/pictures/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(picture),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeNewPicture(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const updatePicture = picture => async dispatch => {
    const res = await csrfFetch(`/api/pictures/${picture.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(picture),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeEditPicture(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const deletePicture =
    ({ id }) =>
    async dispatch => {
        const res = await csrfFetch(`/api/pictures/${id}/`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(storeDeletePicture(data));
            return null;
        } else if (res.status < 500) {
            const data = await res.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ["An error occurred. Please try again."];
        }
    };

const pictureReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_PICTURE:
            const newProjState = { ...state };
            newProjState[payload.id] = payload;
            return newProjState;

        case UPDATE_PICTURE:
            const updateProjState = { ...state };
            const updatePictures = updateProjState[payload.id].pictures;
            updateProjState[payload.id] = payload;
            updateProjState[payload.id].pictures = updatePictures;
            return updateProjState;

        case DELETE_PICTURE:
            const deleteProjState = { ...state };
            delete deleteProjState[payload.id];
            return deleteProjState;

        default:
            return state;
    }
};

export default pictureReducer;
