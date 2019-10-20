import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import request from "request-promise-native";

import { SimpleModal } from "../Modal/Modal.jsx";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    textAlign: "center"
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    background: props =>
      props.color === "High"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.color === "High"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: 8
  },

  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const NavDrawer = () => {
  const classes = useStyles();
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
      <List>
        <h3>Updates</h3>

        <Divider />
        {districtJSONData.map(item => {
          return (
            <div>
              <ListItem button>
                <SimpleModal
                  type={item.Type}
                  priority={item.Priority}
                  location={item.Location}
                  description={item.Description}
                  latitude={item.Latitude}
                  longitude={item.Longitude}
                />
                &nbsp;
                <ListItemText
                  primary={item.Priority}
                  secondary={item.Location}
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};
