import React from "react";
import {withRouter} from "react-router-dom";

// -- Componentes
import {PrivateRoutes, SideBar, TopBar} from "../components"

// -- Material-UI
import clsx from "clsx";
import {makeStyles} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        backgroundColor: "#fff",
        transition: theme
            .transitions
            .create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme
            .transitions
            .create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
        marginLeft: 0
    }
}));

function HomeScreen(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <TopBar open={open} setOpen={setOpen}/>
            <SideBar open={open} setOpen={setOpen}/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}>
                <div className={classes.drawerHeader}/>
                <PrivateRoutes/>
            </main>
        </div>
    );
}

export default withRouter(HomeScreen);