import React from 'react';
import { Avatar, Box, Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => (
    {
        top: {
            width: "100%",
        },
        right: {
            flexGrow: "1",
            paddingLeft: "10px"
        },
        Avatar: {
            width: "100px",
            height: "100px"
        }
    }
));

const CommentItem = ({ onDelete, comment }) => {
    const classes = useStyles();
    return (
        <Box mt={1} bgcolor="lightgreen" padding="10px" borderRadius="5px">
            <Grid styles={classes.top} container direction="row" justify="space-between">
                <Typography variant="h5" color="primary">
                    {comment?.author}
                </Typography>
                <IconButton aria-label="delete" onClick={onDelete} >
                    <DeleteIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Typography variant="h6" component="div">{comment?.content}</Typography>
        </Box>
    );
};

export default CommentItem;
