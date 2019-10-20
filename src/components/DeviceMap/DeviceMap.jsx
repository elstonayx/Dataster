import React, { useState, useEffect, useContext } from "react";
import request from "request-promise-native";
import { Map } from "react-leaflet";
import PropTypes from "prop-types";

import { RiskAreaMarker } from "../RiskAreaMarker/RiskAreaMarker";
import { MissingPeople } from "../MissingPeople/MissingPeople";
import { MapLayers } from "./MapLayers/MapLayers";
import GlobalContext from "../../GlobalContext";
import { GeoJSONDataOverlay } from "./Overlays/GeoDataOverlay/GeoDataOverlay";

const getColorRangeBasedOnValue = value => {
  const red = parseInt(255 * value).toString(16);
  const green = parseInt(255 * (1 - value)).toString(16);
  return `#${red}${green}00`;
};

export const DeviceMap = props => {
  const [districtPopulationData, setDistrictPopulationData] = useState({});
  const [missingPeopleData, setMissingPeopleData] = useState({});

  const GlobalState = useContext(GlobalContext).state;

  useEffect(() => {
    request({
      method: "GET",
      uri: "https://dataster-c6fa8.firebaseio.com/Country.json"
    }).then(data => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setDistrictPopulationData(parsedData.Districts);
      setMissingPeopleData(parsedData.MissingPeople);
    });

    return () => {};
  }, []);

  return (
    <div style={{ width: "inherit", height: "inherit" }}>
      <Map center={props.position} zoom={7}>
        <MapLayers />
        {GlobalState.isLandslideAreaShown && (
          <GeoJSONDataOverlay
            uri="https://pmmpublisher.pps.eosdis.nasa.gov/products/global_landslide_nowcast/export/Global/2019/293/global_landslide_nowcast_20191020.geojson"
            color="orange"
          />
        )}
        {GlobalState.isWeatherDataShown && (
          <GeoJSONDataOverlay
            uri="https://pmmpublisher.pps.eosdis.nasa.gov/products/gpm_1d/export/r07/2019/285/gpm_1d.20191012.geojson"
            color="blue"
          />
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
                locationName={districtName}
                populationData={{
                  label: Object.keys(data),
                  values: Object.values(data)
                }}
                genderData={{
                  label: ["Male", "Female"],
                  values: [districtData["%male"], districtData["%female"]]
                }}
                vulnerabilityScore={districtData["Vulerability Score"]}
                risks={districtData["risks"]}
              />
            );
          })}
        {GlobalState.isMissingPeopleShown &&
          Object.keys(missingPeopleData).map((personName, index) => {
            const personData = missingPeopleData[personName];

            const data = {
              Name: personName,
              Age: personData["Age"],
              Disabled: personData["Disabled"],
              Gender: personData["Gender"]
            };

            console.log(data);

            return (
              <MissingPeople
                center={[
                  personData[`Last Seen`].Latitude,
                  personData[`Last Seen`].Longitude
                ]}
                key={index}
                data={data}
              />
            );
          })}
        })}
        <GeoJSONDataOverlay
          uri="https://raw.githubusercontent.com/mesaugat/geoJSON-Nepal/master/nepal-districts-new.geojson"
          color="gray"
        />
      </Map>
    </div>
  );
};

DeviceMap.propTypes = {
  position: PropTypes.array
};
