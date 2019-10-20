import React, { useState, useEffect, useContext } from "react";
import request from "request-promise-native";
import { Map, GeoJSON } from "react-leaflet";
import PropTypes from "prop-types";

import { RiskAreaMarker } from "../RiskAreaMarker/RiskAreaMarker";
import { MapLayers } from "../MapLayers/MapLayers";
import GlobalContext from "../../GlobalContext";

const getColorRangeBasedOnValue = value => {
  const red = parseInt(255 * value).toString(16);
  const green = parseInt(255 * (1 - value)).toString(16);
  return `#${red}${green}00`;
};

export const DeviceMap = props => {
  const [geoJSONData, setGeoJSONData] = useState();
  const [districtPopulationData, setDistrictPopulationData] = useState({});
  const GlobalState = useContext(GlobalContext).state;

  useEffect(() => {
    request({
      method: "GET",
      uri:
        "https://pmmpublisher.pps.eosdis.nasa.gov/products/s3/Global/global_landslide_nowcast/2019/288/global_landslide_nowcast_20191015.geojson"
    }).then(data => {
      const parsedData = JSON.parse(data);
      setGeoJSONData(parsedData);
    }, console.log);
    request({
      method: "GET",
      uri: "https://dataster-c6fa8.firebaseio.com/Country.json"
    }).then(data => {
      const parsedData = JSON.parse(data);
      setDistrictPopulationData(parsedData.Districts);
    });

    return () => {};
  }, []);

  return (
    <div style={{ width: "inherit", height: "inherit" }}>
      <Map center={props.position} zoom={7}>
        <MapLayers />
        {GlobalState.isLandslideAreaShown && geoJSONData && (
          <GeoJSON data={geoJSONData} color="orange" />
        )}
        {GlobalState.isRiskAreaShown &&
          Object.keys(districtPopulationData).map((districtName, index) => {
            const districtData = districtPopulationData[districtName];

            const data = {
              Youth: districtData["%youth"] * districtData.population,
              "Middle-aged":
                (100 - districtData["%youth"] - districtData["%elderly"]) *
                districtData.population,
              Elderly: districtData["%elderly"] * districtData.population
            };

            return (
              <RiskAreaMarker
                center={[districtData.Latitude, districtData.Longitude]}
                radius={districtData["area km^2"] * 20}
                color={getColorRangeBasedOnValue(
                  districtData["Vulerability Score"]
                )}
                key={index}
                data={{
                  label: Object.keys(data),
                  values: Object.values(data)
                }}
              />
            );
          })}
      </Map>
    </div>
  );
};

DeviceMap.propTypes = {
  position: PropTypes.array
};
