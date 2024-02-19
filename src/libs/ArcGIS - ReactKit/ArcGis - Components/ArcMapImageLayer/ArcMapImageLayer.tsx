import React, { useContext, useEffect, useState } from "react";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { MapImageLayerContext, MapViewContext } from "../Contexts";

interface IArcMapImageLayerProps {
  url: string; // URL do MapImageLayer
  children?: React.ReactNode;
}

export const ArcMapImageLayer = (props: IArcMapImageLayerProps) => {
  const { url, children } = props;
  const { view } = useContext(MapViewContext);
  const [mapImageLayer] = useState<MapImageLayer | null>(null);

  useEffect(() => {
    // Cria a instância da MapImageLayer
    const layer = new MapImageLayer({
      url: url,
    });
  
    // Adiciona a camada ao mapa, se ainda não estiver presente
    if (view && layer && !view.map.layers.includes(layer)) {
      view.map.add(layer);
    }
  
    // Remove a camada do mapa quando o componente é desmontado
    return () => {
      console.log("ArcMapImageLayer unmounting");
      if (view && layer && view.map.layers.includes(layer)) {
        view.map.remove(layer);
      }
    };
  }, [url, view]);


  return (
    <>
      {mapImageLayer && (
        <MapImageLayerContext.Provider value={{ mapImageLayer }}>
          {children}
        </MapImageLayerContext.Provider>
      )}
    </>
  );
};
