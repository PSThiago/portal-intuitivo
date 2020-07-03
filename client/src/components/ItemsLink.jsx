import React from "react";

// -- Material UI: Core
import {List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";

// -- Material UI: Icon
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ClassIcon from '@material-ui/icons/Class';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import {withRouter} from "react-router-dom";

function ItemsLink (props) {
    const {history} = props;
    const itemList = [
        {
            text: "Dashboard",
            icon: <LibraryBooksIcon/>,
            onClick: () => history.push("/dashboard")
        }, {
            text: "Classroom",
            icon: <ClassIcon/>,
            onClick: () => history.push("/classroom")
        }, {
            text: "Meu desempenho",
            icon: <EqualizerIcon/>,
            onClick: () => history.push("/desempenho")
        }, {
            text: "Controle de Usuário",
            icon: <PeopleIcon/>,
            onClick: () => history.push("/controle-usuario")
        }
    ]

    return (
        <List>
            <Divider/> {
                itemList.map(item => {
                    const {text, icon, onClick} = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    )
                })
            }
        </List>
    );
}

export default withRouter(ItemsLink);