import React, { useEffect } from "react";

import { DeviceMap } from "./components/DeviceMap/DeviceMap.jsx";
import { NavDrawer } from "./components/NavDrawer/NavDrawer.jsx";
import { GlobalProvider } from "./GlobalContext.jsx";

import "./App.css";
import { Container, ButtonGroup, Button, Card } from "@material-ui/core";

const defaultState = {
  position: [27.700769, 85.30014],
  isRiskAreaShown: true,
  isLandslideAreaShown: true,
  isWeatherDataShown: true,
  isMissingPeopleShown: true
};

function App() {
  const [state, setState] = React.useState(defaultState);

  const handleRiskClick = () => {
    setState({ ...state, isRiskAreaShown: !state.isRiskAreaShown });
  };

  const handleLandslideAreaClick = () => {
    setState({ ...state, isLandslideAreaShown: !state.isLandslideAreaShown });
  };

  const handleWeatherAreaClick = () => {
    setState({ ...state, isWeatherDataShown: !state.isWeatherDataShown });
  };

  const handleMissingPeopleClick = () => {
    setState({ ...state, isMissingPeopleShown: !state.isMissingPeopleShown });
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
              <Button
                onClick={handleLandslideAreaClick}
                style={{ backgroundColor: "orange" }}
                color="secondary"
                variant="contained"
              >
                Toggle Landslide Area
              </Button>
              <Button
                onClick={handleWeatherAreaClick}
                style={{ backgroundColor: "blue" }}
                color="secondary"
                variant="contained"
              >
                Toggle Weather Area
              </Button>
              <Button onClick={handleMissingPeopleClick}>
                Toggle Missing People Display
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
