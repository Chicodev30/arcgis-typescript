import React, { useEffect, useRef, useState } from "react";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-tooltip"
import "@esri/calcite-components/dist/components/calcite-block"
import "@esri/calcite-components/dist/components/calcite-input"
import "@esri/calcite-components/dist/components/calcite-label"
import "@esri/calcite-components/dist/components/calcite-select"
import "@esri/calcite-components/dist/components/calcite-option"
import "@esri/calcite-components/dist/components/calcite-input-number"
import "@esri/calcite-components/dist/components/calcite-input-date-picker"
import "@esri/calcite-components/dist/components/calcite-popover"


import {
  CalciteShell,
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePopover,
  CalcitePanel,
} from "@esri/calcite-components-react";

import {ArcMapView,
    ArcMapImageLayer,
    ArcFeatureLayer
  } from './libs/ArcGIS - ReactKit';

//import ImageLayerData from "./libs/data/ImageLayerData.ts"
//import ImageLayerData2 from "./libs/data/ImageLayerData2.ts"
//import ImageLayerData3 from "./libs/data/ImageLayerData3.ts"

import FeatureLayer1 from "./libs/data/FeatureLayers/FeatureLayer1.ts"
import './App.css'

import Procurar from "./libs/procurar";
import Guia from "./libs/guia";


const App = () => {
  const shellPanelStartRef = useRef<HTMLCalciteShellPanelElement>(null);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const togglePanel = (panelName: string) => {
    setActivePanel(prevActivePanel => {
      if (prevActivePanel === panelName) {
        setIsCollapsed(true);
        return null;
      } else {
        setIsCollapsed(false);
        return panelName;
      }
    });
  };

  const [isActionBarExpanded, setIsActionBarExpanded] = useState(true);
  
  useEffect(() => {
    const shellPanelStart = shellPanelStartRef.current;
    const actions = shellPanelStart?.querySelectorAll("calcite-action");
    

    actions?.forEach(action => {
      const panelName = action.getAttribute('text')?.toLowerCase() || '';
      action.addEventListener("click", () => togglePanel(panelName));
    });

    return () => {
      actions?.forEach(action => {
        const panelName = action.getAttribute('text')?.toLowerCase() || '';
        action.removeEventListener("click", () => togglePanel(panelName));
      });
    };
  }, []);

  const isPanelActive = (panelName: string) => activePanel === panelName;

  return (
    <CalciteShell>
      <CalciteShellPanel slot="panel-start" position="start" ref={shellPanelStartRef} collapsed={isCollapsed}>
      <CalciteActionBar
  slot="action-bar"
  expanded={isActionBarExpanded}
  onMouseEnter={() => setIsActionBarExpanded(true)}
  onMouseLeave={() => setIsActionBarExpanded(false)}
>
          <CalciteAction icon="home" text="home"></CalciteAction>
          <CalciteAction icon="search" text="procurar" onClick={() => togglePanel('procurar')}></CalciteAction>
          <CalciteAction icon="question" text="question" id="question"></CalciteAction>
          <CalciteAction icon="sign-out" text="sign-out"></CalciteAction>
  <CalcitePopover
    heading="Guia de uso"
    label="Guia de uso"
    referenceElement="question"
    id="question"
    closable
    overlayPositioning="absolute"
  >
    <Guia />
  </CalcitePopover>
        </CalciteActionBar>

        {isPanelActive('procurar') && (
          <Procurar />
        )}

      </CalciteShellPanel>
      <CalcitePanel>
        <div className="cabecalho">
        OSPOA
        <a href="https://prefeitura.poa.br/procempa" target="_blank" id="procempa-titulo"><p>Procempa</p></a>
        <a href="https://prefeitura.poa.br/" target="_blank"><img src="/brasao-pmpa.png" alt="Brasao de POA" /></a>
        </div>
      <ArcMapView>
        < ArcFeatureLayer url = {FeatureLayer1.url} popupTemplate={FeatureLayer1.popupTemplate}/>
      </ArcMapView>
      </CalcitePanel>
    </CalciteShell>
  );
}
export default App;
//<DropdownSelector defaultvalue="Selecione uma camada" options={basemaps}/>
//< ArcMapImageLayer url={ImageLayerData2.url}/>
//< ArcMapImageLayer url={ImageLayerData3.url}/>
 //< ArcMapImageLayer url={ImageLayerData.url} imageMaxHeight={ImageLayerData.imageMaxHeight} imageMaxWidth={ImageLayerData.imageMaxWidth}/>