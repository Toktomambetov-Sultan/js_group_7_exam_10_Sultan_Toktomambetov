import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormPost from '../../components/FormPost/FormPost';
import { addPost, changeCurrentPost } from '../../store/actions';

const NewsPostPage = (props) => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const addPostHandler = async (post) => await dispatch(addPost(post));

    const changeCurrentPostHandler = (prop, value) => dispatch(changeCurrentPost(prop, value));

    const onFormSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        Object.keys(state.currentPost).forEach(key => {
            formData.append(key, state.currentPost[key]);
        });
        await addPostHandler(formData);
        props.history.push({
            pathname: "/"
        });
    };

    const onFormChange = (event) => {
        const { name } = event.target;
        let value;
        switch (name) {
            case "image":
                value = event.target.files[0]; break;
            default:
                value = event.target.value;
        }
        changeCurrentPostHandler(name, value);
    };
    return (
        <FormPost onChange={onFormChange} onSubmit={onFormSubmit} />
    );
};

export default NewsPostPage;
