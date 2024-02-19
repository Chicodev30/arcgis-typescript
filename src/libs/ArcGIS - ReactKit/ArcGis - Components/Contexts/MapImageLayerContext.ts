import { createContext } from "react";

interface IMapImageLayerContext {
  mapImageLayer: __esri.MapImageLayer;
}

export const MapImageLayerContext = createContext({} as IMapImageLayerContext);
