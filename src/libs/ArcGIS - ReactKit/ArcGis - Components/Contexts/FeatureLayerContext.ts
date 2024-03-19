import { createContext } from "react";

interface IFeatureLayerContext {
    featureLayer: __esri.FeatureLayer;
}

export const FeatureLayerContext = createContext({} as IFeatureLayerContext);
