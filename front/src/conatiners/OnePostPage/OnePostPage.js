import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentItem from '../../components/CommentItem/CommentItem';
import FormComment from '../../components/FormComment/FormComment';
import PostItem from '../../components/PostItem/PostItem';
import { getPostById, addComment, getComments, deleteComment, deletePost } from '../../store/actions';

const OnePostPage = (props) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState({
        content: "", author: "", news_post_id: props.match.params.id
    });
    const state = useSelector((state) => state);
    useEffect(() => {
        dispatch(getPostById(props.match.params.id));
    }, [dispatch]);

    const addCommentHandler = (comment) => dispatch(addComment(comment));

    const onSubmit = (event) => {
        event.preventDefault();
        addCommentHandler({ ...comment });
    };
    const onChange = (event) => {
        const { name, value } = event.target;
        setComment(prevStatus => ({ ...prevStatus, [name]: value }));
    };
    const onPostDeleteHandler = async () => {
        await dispatch(deletePost(props.match.params.id));
        props.history.push({
            pathname: "/"
        });
    };
    const onCommentDelete = (comment) => dispatch(deleteComment(comment));

    useEffect(() => {
        dispatch(getComments(props.match.params.id));
    }, [dispatch]);

    return (
        <Container>
            <PostItem post={state.currentPost} onDelete={onPostDeleteHandler} hide={true} />
            <FormComment onChange={onChange} onSubmit={onSubmit} comment={comment} />
            <div>
                {state.comments.map(comment => (
                    <CommentItem comment={comment} onDelete={() => onCommentDelete(comment)} />
                ))}
            </div>
        </Container>
    );
};

export default OnePostPage;
