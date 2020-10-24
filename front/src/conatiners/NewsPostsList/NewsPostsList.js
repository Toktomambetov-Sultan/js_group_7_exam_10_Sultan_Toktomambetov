import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../components/PostItem/PostItem';
import { getPosts, deletePost, changeCurrentPost } from '../../store/actions';

const NewsPostsList = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const deletePostHandler = (id) => dispatch(deletePost(id));
    const changeCurrentPostHandler = (prop, value) => dispatch(changeCurrentPost(prop, value));

    const onComment = (id) => {
        props.history.push({
            pathname: "/post/" + id
        });
    };

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Container>
            <Typography variant="h5">Posts</Typography>
            <div>
                {state.posts.map(post => (
                    <PostItem
                        onComment={() => onComment(post.id)}
                        onDelete={() => deletePostHandler(post.id)}
                        post={post}
                        key={post.id}
                    />
                ))}
            </div>
        </Container>
    );
};

export default NewsPostsList;
