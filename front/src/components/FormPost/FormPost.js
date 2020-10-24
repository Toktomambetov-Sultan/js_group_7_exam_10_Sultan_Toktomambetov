import React from 'react';
import { Box, Button, Container, TextField } from '@material-ui/core';
import FileUploader from "./../UI/FileUploader/FileUploader";

const FormPost = ({ onSubmit, onChange }) => {
    return (
        <Container component="main" maxWidth="md">
            <Box mt="10vh" textAlign="center">
                <form validate="true" onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="title"
                        name="Title"
                        autoFocus
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={10}
                        onChange={onChange}
                        name="content"
                        label="Content"
                    />
                    <Box marginTop={2} padding="0 10%">
                        <FileUploader name="image" onChange={onChange} label="image" />
                    </Box>
                    <Box marginTop={2} width="300px" display="inline-block">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Create
                    </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default FormPost;
