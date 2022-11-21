import { csrfFetch } from "./csrf";

const NEW_ARTICLE = "articles/newArticle";
const UPDATE_ARTICLE = "articles/editArticle";
const DELETE_ARTICLE = "articles/deleteArticle";

const storeNewArticle = article => {
    return {
        type: NEW_ARTICLE,
        payload: article,
    };
};

const storeEditArticle = article => {
    return {
        type: UPDATE_ARTICLE,
        payload: article,
    };
};

const storeDeleteArticle = articleId => {
    return {
        type: DELETE_ARTICLE,
        payload: articleId,
    };
};

export const createArticle = article => async dispatch => {
    const res = await csrfFetch(`/api/articles/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeNewArticle(data));
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

export const updateArticle = article => async dispatch => {
    const res = await csrfFetch(`/api/articles/${article.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeEditArticle(data));
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

export const deleteArticle =
    ({ id }) =>
    async dispatch => {
        const res = await csrfFetch(`/api/articles/${id}/`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(storeDeleteArticle(data));
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

const articleReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_ARTICLE:
            const newProjState = { ...state };
            newProjState[payload.id] = payload;
            return newProjState;

        case UPDATE_ARTICLE:
            const updateProjState = { ...state };
            const updateArticles = updateProjState[payload.id].articles;
            updateProjState[payload.id] = payload;
            updateProjState[payload.id].articles = updateArticles;
            return updateProjState;

        case DELETE_ARTICLE:
            const deleteProjState = { ...state };
            delete deleteProjState[payload.id];
            return deleteProjState;

        default:
            return state;
    }
};

export default articleReducer;
