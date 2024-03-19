import React, { useEffect, useRef, useState } from "react";

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand";
import Search from "@arcgis/core/widgets/Search";
import Print from "@arcgis/core/widgets/Print"
import Legend from "@arcgis/core/widgets/Legend";
import LayerList from "@arcgis/core/widgets/LayerList";

import { createMapView } from "../../ArcGis - SDK";

import { MapViewContext } from "../Contexts";

import "./ArcMapView.css";

interface IArcMapViewProps {
  children?: React.ReactNode;
  mapProperties?: __esri.MapProperties;
}

export const ArcMapView = (props: IArcMapViewProps) => {
  const { children, mapProperties } = props;

  const mapRef = useRef(null);

  const [view, setView] = useState<__esri.MapView | undefined>();

  useEffect(() => {
    if (!mapRef.current) return;
  
    // Cria a view do mapa
    const _view = createMapView({ mapProperties, container: mapRef.current });
  
    setView(_view);

    _view.when(() => {
      const print = new Print({
        view: _view,
        // specify your own print service
        printServiceUrl:
          "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
      });
      const printExpand = new Expand({
        view: _view,
        content: print,
        expandIcon: "print"
      });

      let legend = new Legend({
        view: _view
      });

      const legendExpand = new Expand({
        content: legend,
        expandIcon: "legend"
      });

      const layerList = new LayerList({
        view: _view,
      });

      const layerListExpand = new Expand({
        content: layerList,
        expandIcon: "layer"
      });
    
      _view.ui.add(layerListExpand, "top-right");
      _view.ui.add(legendExpand, "bottom-right");
      _view.ui.add(printExpand, "bottom-left");

      const basemapGallery = new BasemapGallery({
        view: _view,
      });

      const bgExpand = new Expand({
        content: basemapGallery,
        expandIcon: "basemap"
      });
      _view.ui.add(bgExpand, "bottom-right");
      
      let searchWidget = new Search({
        view: _view
      });

      const searchWidgetExpand = new Expand({
        content: searchWidget,
        expandIcon: "search"
      });
      _view.ui.add(searchWidgetExpand, "top-right");

     
    });

    return () => {
      if (_view) {
        _view.destroy();
      }
    };
  }, [mapProperties]); // Dependência apenas para mapProperties

  return (
    <div className="viewDiv" ref={mapRef}>
      <MapViewContext.Provider value={{ view }}>
        {children}
      </MapViewContext.Provider>
    </div>
  );
};
