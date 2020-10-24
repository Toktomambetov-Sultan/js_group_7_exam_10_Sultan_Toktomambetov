import axiosOrder from "../axiosOrder";
import { FETCH_REQUEST, FETCH_ERROR, FETCH_SUCCESS, GET_POSTS, CHANGE_CURRENT_POST } from "./actionTypes";


const fetchRequest = () => {
    return { type: FETCH_REQUEST };
};

const fetchSuccess = () => {
    return { type: FETCH_SUCCESS };
};

const fetchError = (error) => {
    return { type: FETCH_ERROR, data: { ...error } };
};

const getPostsAction = (posts) => {
    return { type: GET_POSTS, posts };
};


export const changeCurrentPost = (prop, value) => {
    return { type: CHANGE_CURRENT_POST, prop, value };
};

export const getPosts = (datetime) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axiosOrder.get("/news_posts" + (datetime ? datetime : ""));
            dispatch(getPostsAction(response.data || []));
            dispatch(fetchSuccess);
        } catch (error) {
            dispatch(fetchError(error));
        }
    };
};
export const addPost = (post) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            await axiosOrder.post("/news_posts", post);
            dispatch(fetchSuccess());
        } catch (error) {
            dispatch(fetchError(error.response.data));
        }
    };
};
export const deletePost = (id) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            await axiosOrder.delete("/news_posts/" + id);
            await dispatch(getPosts());
            dispatch(fetchSuccess());
        } catch (error) {
            dispatch(fetchError(error.response.data));
        }
    };
};