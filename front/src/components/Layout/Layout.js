import { AppBar, Container, Grid, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    navLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "22px",
        "&.active": {
            color: "lightgreen",
        }
    }
}));
const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth="md">
                        <Grid container justify="space-around">

                            <NavLink exact className={classes.navLink} to="/newsPosts">
                                news posts
                            </NavLink>
                            <NavLink exact className={classes.navLink} to="/newNewsPost">
                                new news post
                            </NavLink>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
