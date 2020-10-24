import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';

const FormComment = ({ onChange, onSubmit, comment }) => {
    return (
        <Box textAlign="center">
            <form validate="true" onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Author"
                    name="author"
                    value={comment.author}
                    autoFocus
                    onChange={onChange}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={2}
                    value={comment.content}
                    onChange={onChange}
                    name="content"
                    label="Content"
                />
                <Box marginTop={2} width="300px" display="inline-block">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        add comment
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default FormComment;
