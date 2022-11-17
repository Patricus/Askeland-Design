import articleReducer from "./articles";
import { csrfFetch } from "./csrf";

const GET_PROJECTS = "projects/getProjects";
const NEW_PROJECT = "projects/newProject";
const UPDATE_PROJECT = "projects/editProject";
const DELETE_PROJECT = "projects/deleteProject";

//To forward to articlesReducer
const NEW_ARTICLE = "articles/newArticle";
const UPDATE_ARTICLE = "articles/editArticle";
const DELETE_ARTICLE = "articles/deleteArticle";

const storeProjects = projects => {
    return {
        type: GET_PROJECTS,
        payload: projects,
    };
};

const storeNewProject = project => {
    return {
        type: NEW_PROJECT,
        payload: project,
    };
};

const storeEditProject = project => {
    return {
        type: UPDATE_PROJECT,
        payload: project,
    };
};

const storeDeleteProject = projectId => {
    return {
        type: DELETE_PROJECT,
        payload: projectId,
    };
};

export const getProjects = () => async dispatch => {
    const res = await csrfFetch(`/api/projects/`);
    const data = await res.json();
    dispatch(storeProjects(data.projects));
    return res;
};

export const createProject = project => async dispatch => {
    const res = await csrfFetch(`/api/projects/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeNewProject(data));
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

export const updateProject = project => async dispatch => {
    const res = await csrfFetch(`/api/projects/${project.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeEditProject(data));
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

export const deleteProject = projectId => async dispatch => {
    const res = await csrfFetch(`/api/projects/${projectId}/`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(storeDeleteProject(projectId));
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

const projectReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GET_PROJECTS:
            const projects = {};
            payload.forEach(project => {
                projects[project.id] = project;
                const { articles } = project;
                project.articles = {};
                articles.forEach(article => {
                    project.articles[article.id] = article;
                });
            });
            return projects;

        case NEW_PROJECT:
            const newProjState = { ...state };
            newProjState[payload.id] = payload;
            return newProjState;

        case UPDATE_PROJECT:
            const updateProjState = { ...state };
            const articles = updateProjState[payload.id].articles;
            updateProjState[payload.id] = payload;
            updateProjState[payload.id].articles = articles;
            return updateProjState;

        case DELETE_PROJECT:
            const deleteProjState = { ...state };
            delete deleteProjState[payload];
            return deleteProjState;

        case NEW_ARTICLE:
        case UPDATE_ARTICLE:
        case DELETE_ARTICLE:
            const articleState = { ...state };
            articleState.projects[payload.projectId] = {
                ...state.projects[payload.projectId],
                articles: articleReducer(state.projects[payload.projectId].articles, {
                    type,
                    payload,
                }),
            };

        default:
            return state;
    }
};

export default projectReducer;
