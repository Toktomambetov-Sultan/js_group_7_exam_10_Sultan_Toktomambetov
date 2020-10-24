import axiosOrder from "../axiosOrder";
import { FETCH_REQUEST, FETCH_ERROR, FETCH_SUCCESS, GET_POSTS, CHANGE_CURRENT_POST, GET_COMMENTS } from "./actionTypes";


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
const getCommentsAction = (comments) => {
    return { type: GET_COMMENTS, comments };
};


export const changeCurrentPost = (prop, value) => {
    return { type: CHANGE_CURRENT_POST, prop, value };
};

export const getPosts = (datetime) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axiosOrder.get("/news_posts");
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
        console.log(post);
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

export const getPostById = (id) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axiosOrder.get("/news_posts/" + id);
            const post = response.data;
            Object.keys(post).forEach(key => {
                dispatch(changeCurrentPost(key, post[key]));
            });
            dispatch(fetchSuccess());
        } catch (error) {
            dispatch(fetchError(error));
        }
    };
};
export const getComments = (id) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axiosOrder.get("/comments?news_post_id=" + id);
            dispatch(getCommentsAction(response.data.reverse() || []));
            dispatch(fetchSuccess);
        } catch (error) {
            dispatch(fetchError(error));
        }
    };
};
export const addComment = (comment) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            await axiosOrder.post("/comments", comment);
            await dispatch(getComments(comment.news_post_id));
            dispatch(fetchSuccess());
        } catch (error) {
            dispatch(fetchError(error));
        }
    };
};
export const deleteComment = (comment) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            await axiosOrder.delete("/comments/" + comment.id);
            await dispatch(getComments(comment.news_post_id));
            dispatch(fetchSuccess());
        } catch (error) {
            dispatch(fetchError(error.response.data));
        }
    };
};