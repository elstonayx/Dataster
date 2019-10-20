import React, { useEffect } from "react";

import { DeviceMap } from "./components/DeviceMap/DeviceMap.jsx";
import { NavDrawer } from "./components/NavDrawer/NavDrawer.jsx";
import { GlobalProvider } from "./GlobalContext.jsx";

import "./App.css";
import { Container, ButtonGroup, Button, Card } from "@material-ui/core";

const defaultState = {
  position: [27.700769, 85.30014],
  isRiskAreaShown: true,
  isLandslideAreaShown: true
};

function App() {
  const [state, setState] = React.useState(defaultState);

  const handleRiskClick = () => {
    setState({ ...state, isRiskAreaShown: !state.isRiskAreaShown });
  };

  const handleLandslideAreaClick = () => {
    setState({ ...state, isLandslideAreaShown: !state.isLandslideAreaShown });
  };

  useEffect(() => {
    return () => {};
  });
  return (
    <div>
      <GlobalProvider value={{ state, setState }}>
        <Container>
          <Card
            style={{
              position: "absolute",
              bottom: "20px",
              marginLeft: "200px",
              backgroundColor: "white",
              display: "inline-block",
              width: "auto"
            }}
          >
            <ButtonGroup style={{ margin: "0px" }}>
              <Button onClick={handleRiskClick}>Toggle Risk Area</Button>
              <Button onClick={handleLandslideAreaClick}>
                Toggle Landslide Area
              </Button>
            </ButtonGroup>
          </Card>
          <NavDrawer />
          <DeviceMap position={state.position} />
        </Container>
      </GlobalProvider>
    </div>
  );
}

export default App;
