import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GlobalContext from "../../GlobalContext.jsx";
import request from "request-promise-native";
import { textAlign } from "@material-ui/system";

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
  const [districtJSONData, setDistrictJSONData] = useState([]);

  useEffect(() => {
    request({
      method: "GET",
      uri: "https://dataster-c6fa8.firebaseio.com/Country/Messages.json"
    }).then(data => {
      console.log(data);
      const parsedData = JSON.parse(data);
      setDistrictJSONData(parsedData);
    }, console.log);
    return () => {};
  }, []);
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

      <List>
        <h3>Updates</h3>
        {districtJSONData.map(item => {
          return (
            <ListItem>
              {item.Description}
              <strong>{item.Priority}</strong>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
