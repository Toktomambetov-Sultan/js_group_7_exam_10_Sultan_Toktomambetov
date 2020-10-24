import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../components/PostItem/PostItem';
import { getPosts, deletePost } from '../../store/actions';

const NewPostsList = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const deletePostHandler = (id) => dispatch(deletePost(id));
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    console.log(state);
    return (
        <Container>
            <Typography variant="h5">Posts</Typography>
            <div>
                {state.posts.map(post => (
                    <PostItem onDelete={() => deletePostHandler(post.id)} post={post} key={post.id} />
                ))}
            </div>
        </Container>
    );
};

export default NewPostsList;
