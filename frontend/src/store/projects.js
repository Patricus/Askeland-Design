import { csrfFetch } from "./csrf";

const GET_PROJECTS = "projects/getProjects";
const NEW_PROJECT = "projects/newProject";
const UPDATE_PROJECT = "project/editProject";
const DELETE_PROJECT = "project/deleteProject";

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

export const editProject = project => async dispatch => {
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
            updateProjState[payload.id] = payload;
            return updateProjState;

        case DELETE_PROJECT:
            const deleteProjState = { ...state };
            delete deleteProjState[payload];
            return deleteProjState;

        default:
            return state;
    }
};

export default projectReducer;
