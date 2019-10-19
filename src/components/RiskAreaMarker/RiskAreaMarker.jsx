import React from "react";
import { Circle } from "react-leaflet";

import { Popover, Card } from "@material-ui/core";

export const RiskAreaMarker = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(document.getElementsByTagName("main"));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Circle
        center={[27.700769, 85.30014]}
        radius={100000}
        onClick={handleClick}
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
        <Card>
          <div
            style={{ backgroundColor: "red", height: "200px", width: "200px" }}
          ></div>
        </Card>
      </Popover>
    </>
  );
};
