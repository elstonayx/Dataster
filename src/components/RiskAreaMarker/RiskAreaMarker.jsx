import React from "react";
import { Circle } from "react-leaflet";

import { Popover } from "@material-ui/core";
import { RiskInfoCard } from "../RiskInfoCard/RiskInfoCard";

export const RiskAreaMarker = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = () => {
    setAnchorEl(document.getElementsByTagName("main"));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Circle
        center={props.center}
        radius={props.radius}
        onClick={handleClick}
        color={props.color}
        fillOpacity={0.8}
      />
      <Popover
        id="simple-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={handleClose}
      >
        <RiskInfoCard data={props.data} />
      </Popover>
    </>
  );
};
