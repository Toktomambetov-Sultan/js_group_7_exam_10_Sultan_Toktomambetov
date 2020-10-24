import { Avatar, Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert, AlertTitle } from '@material-ui/lab';
// import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { ImagesUrl } from '../../config';

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

const PostItem = ({ post, onDelete }) => {
    const classes = useStyles();
    return (
        <Box mt={1} bgcolor="lightblue" padding="10px" borderRadius="5px">
            <Grid container>
                <Avatar className={classes.Avatar} src={ImagesUrl + "/" + post.image} />
                <Grid item className={classes.right} >
                    <Grid styles={classes.top} container direction="row" justify="space-between">
                        <Typography variant="h5" color="primary">
                            {post.title}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={onDelete}
                        >
                            delete
                        </Button>
                    </Grid>
                    <Typography variant="subtitle1" component="div">{post.content}</Typography>
                    <Button variant="outlined">comment</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PostItem;
