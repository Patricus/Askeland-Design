import { csrfFetch } from "./csrf";

const GET_PROJECTS = "projects/getProjects";

const storeProjects = projects => {
    return {
        type: GET_PROJECTS,
        payload: projects,
    };
};

export const getProjects = () => async dispatch => {
    const response = await csrfFetch(`/api/projects/`);
    const data = await response.json();
    dispatch(storeProjects(data.projects));
    return response;
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

        default:
            return state;
    }
};

export default projectReducer;
