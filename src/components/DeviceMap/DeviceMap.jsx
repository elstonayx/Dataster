import React from "react";
import { Map, TileLayer, LayersControl } from "react-leaflet";
import PropTypes from "prop-types";

const { BaseLayer, Overlay } = LayersControl;

export const DeviceMap = props => {
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
      </Map>
    </div>
  );
};

DeviceMap.propTypes = {
  position: PropTypes.array
};
