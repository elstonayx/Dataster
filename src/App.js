import React, { useEffect } from "react";

import { DeviceMap } from "./components/DeviceMap/DeviceMap.jsx";
import { NavDrawer } from "./components/NavDrawer/NavDrawer.jsx";
import { GlobalProvider } from "./GlobalContext.jsx";

import "./App.css";

const defaultState = {
  position: [27.700769, 85.30014]
};

function App() {
  const [state, setState] = React.useState(defaultState);
  useEffect(() => {
    return () => {};
  });
  return (
    <div>
      <GlobalProvider value={{ state, setState }}>
        <DeviceMap position={state.position} />
        <NavDrawer />
      </GlobalProvider>
    </div>
  );
}

export default App;
