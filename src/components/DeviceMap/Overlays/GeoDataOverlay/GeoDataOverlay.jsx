import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import request from "request-promise-native";
import { GeoJSON } from "react-leaflet";

export const GeoJSONDataOverlay = props => {
  const [geoJSONData, setGeoJSONData] = useState();

  useEffect(() => {
    request({
      method: "GET",
      uri: props.uri
    }).then(data => {
      const parsedData = JSON.parse(data);
      setGeoJSONData(parsedData);
    });
    return () => {};
  }, []);
  return geoJSONData ? (
    <GeoJSON data={geoJSONData} color={props.color} />
  ) : null;
};

GeoJSONDataOverlay.propTypes = {
  uri: propTypes.string,
  color: propTypes.string
};
