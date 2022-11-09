import { csrfFetch } from "./csrf";

const GET_PROJECTS = "projects/getProjects";
const GET_PROJECT = "projects/getProject";

const storeProject = project => {
    return {
        type: GET_PROJECT,
        payload: project,
    };
};

const storeProjects = projects => {
    return {
        type: GET_PROJECTS,
        payload: projects,
    };
};

export const getProject = projectId => async dispatch => {
    const response = await csrfFetch(`/api/projects/${projectId}`);
    const data = await response.json();
    dispatch(storeProject(data.project));
    return response;
};

export const getProjects = () => async dispatch => {
    const response = await csrfFetch(`/api/projects/`);
    const data = await response.json();
    dispatch(storeProjects(data.projects));
    return response;
};

const projectReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GET_PROJECT:
            const projectState = { ...state };
            projectState[payload.id] = payload;
            return projectState;

        case GET_PROJECTS:
            const projects = {};
            payload.forEach(project => {
                projects[project.id] = project;
            });
            return projects;

        default:
            return state;
    }
};

export default projectReducer;
