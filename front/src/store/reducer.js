import { FETCH_REQUEST, FETCH_ERROR, FETCH_SUCCESS, GET_POSTS, CHANGE_CURRENT_POST, GET_COMMENTS } from "./actionTypes";

const initialState = {
    isLoading: false,
    error: null,
    currentPost: {},
    posts: [],
    comments: [],
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_ERROR:
            return { ...state, isLoading: false, error: { type: action.data.type, data: action.data.errorProps } };
        case FETCH_SUCCESS:
            return { ...state, isLoading: false };
        case GET_POSTS:
            return { ...state, posts: action.posts };
        case CHANGE_CURRENT_POST:
            return { ...state, currentPost: { ...state.currentPost, [action.prop]: action.value } };
        case GET_COMMENTS:
            return { ...state, comments: action.comments };
        default:
            return { ...state };
    }
};
export default reducer;