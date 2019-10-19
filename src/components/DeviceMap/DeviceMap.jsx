import React, { useState, useEffect } from "react";
import request from "request-promise-native";
import { Map, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import PropTypes from "prop-types";

const { BaseLayer } = LayersControl;

export const DeviceMap = props => {
  const [geoJSONData, setGeoJSONData] = useState();

  useEffect(() => {
    request({
      method: "GET",
      uri:
        "https://pmmpublisher.pps.eosdis.nasa.gov/products/s3/Global/global_landslide_nowcast/2019/288/global_landslide_nowcast_20191015.geojson"
    }).then(data => {
      const parsedData = JSON.parse(data);
      setGeoJSONData(parsedData);
    }, console.log);

    return () => {};
  });
  return (
    <div style={{ width: "inherit", height: "inherit" }}>
      <Map center={props.position} zoom={10}>
        <LayersControl>
          <BaseLayer checked name="ERSI Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </BaseLayer>
          <BaseLayer checked name="names">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
          </BaseLayer>
        </LayersControl>
        {geoJSONData && <GeoJSON data={geoJSONData} color="red" />}
      </Map>
    </div>
  );
};

DeviceMap.propTypes = {
  position: PropTypes.array
};
