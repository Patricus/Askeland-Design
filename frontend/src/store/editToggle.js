const TOGGLE = "editToggle/toggle";

export const toggleEdit = () => {
    return {
        type: TOGGLE,
        payload: null,
    };
};

const toggleReducer = (state = false, { type, payload }) => {
    switch (type) {
        case TOGGLE:
            return !state;

        default:
            return state;
    }
};

export default toggleReducer;
