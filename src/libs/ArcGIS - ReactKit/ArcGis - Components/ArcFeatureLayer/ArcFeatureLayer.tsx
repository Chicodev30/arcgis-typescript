import { useContext, useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import { FeatureLayerContext, MapViewContext } from "../Contexts";


interface IArcFeatureLayerProps {
  url: string,// URL do MapImageLayer
  popupTemplate: __esri.PopupTemplate
}

export const ArcFeatureLayer = (props: IArcFeatureLayerProps) => {
  const { url, popupTemplate } = props;
  const { view } = useContext(MapViewContext);
  const [featureLayer, setFeatureLayer] = useState<FeatureLayer>();
  
  

  useEffect(() => {
    if (!view) return; //se a view não existe 

    const layer = new FeatureLayer({  
      url: url,
      popupTemplate
    });
    setFeatureLayer(layer);
  
    // Adiciona a camada ao mapa, se ainda não estiver presente
    if (view && layer && !view.map.layers.includes(layer)) {
      view.map.add(layer);
      console.log(layer.url)
    }
  
    // Remove a camada do mapa quando o componente é desmontado
    return () => {
      if (view && layer && view.map.layers.includes(layer)) {
        view.map.remove(layer);
      }
    };
  }, [url,view]);


  return (
    <>
      {featureLayer && (
        <FeatureLayerContext.Provider value={{ featureLayer }} >
        </FeatureLayerContext.Provider>
      )}
    </>
  );
};
