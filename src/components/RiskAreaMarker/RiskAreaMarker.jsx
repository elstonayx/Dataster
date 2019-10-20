import React from "react";
import { Circle } from "react-leaflet";

import { Popover } from "@material-ui/core";
import { RiskInfoCard } from "../RiskInfoCard/RiskInfoCard";

export const RiskAreaMarker = ({ center, radius, color, ...otherProps }) => {
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
        center={center}
        radius={radius}
        onClick={handleClick}
        color={color}
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
        <RiskInfoCard {...otherProps} />
      </Popover>
    </>
  );
};
