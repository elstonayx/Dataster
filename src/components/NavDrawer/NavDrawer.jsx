import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GlobalContext from "../../GlobalContext.jsx";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

const InputButtons = [
  {
    title: "Singapore",
    position: [1.2905, 103.852]
  },
  {
    title: "Bangka",
    position: [-2.4706, 106.2264]
  }
];

export const NavDrawer = () => {
  const classes = useStyles();
  const globalState = React.useContext(GlobalContext);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Divider />
      <List>
        {InputButtons.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              onClick={() => {
                globalState.setState({ position: item.position });
              }}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
};
