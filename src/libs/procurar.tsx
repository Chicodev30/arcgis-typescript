import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-block"
import "@esri/calcite-components/dist/components/calcite-input"
import "@esri/calcite-components/dist/components/calcite-label"
import "@esri/calcite-components/dist/components/calcite-select"
import "@esri/calcite-components/dist/components/calcite-option"
import "@esri/calcite-components/dist/components/calcite-input-number"
import "@esri/calcite-components/dist/components/calcite-input-date-picker"

import { MapViewContext } from "./ArcGIS - ReactKit/ArcGis - Components/Contexts";
import FeatureLayer1 from "../libs/data/FeatureLayers/FeatureLayer1"

import {
  CalcitePanel,
  CalciteBlock,
  CalciteLabel,
  CalciteSelect,
  CalciteOption,
  CalciteInput,
  CalciteInputNumber,
  CalciteInputDatePicker,
} from "@esri/calcite-components-react";
import { useEffect,useContext,useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import featureLayer1 from "../libs/data/FeatureLayers/FeatureLayer1";


const Procurar = () => {
  const { view } = useContext(MapViewContext);
  const [NRPROTOCOLO, setNRPROTOCOLO] = useState("");

  const handleProtocoloChange = (event:any) => {
    setNRPROTOCOLO(event.target.value);
  };

  const handleSubmit = async () => {
    if (!view || !NRPROTOCOLO) return;

    const featureLayer = new FeatureLayer({
      url: featureLayer1.url, // Usa a URL da camada importada
      popupTemplate: featureLayer1.popupTemplate, // Usa o template de popup definido
    });

    const query = featureLayer.createQuery();
    query.where = `NRPROTOCOLO = '${NRPROTOCOLO}'`; // Usa o nome correto do campo na consulta
    query.returnGeometry = true;
    query.outFields = ["*"]; // Ajuste conforme necessário

    try {
      const results = await featureLayer.queryFeatures(query);
      console.log(results.fields);
      // Processa e exibe os resultados como necessário
    } catch (error) {
      console.error("Erro ao realizar a consulta:", error);
    }
  };

    return (

        <CalcitePanel>
            <CalciteBlock open heading={""}>
            <h3 className="custom-heading">Procurar</h3>
              <CalciteLabel>
                Escolha uma camada
                <CalciteSelect label="camada">
                  <CalciteOption value="cap">Ordens de serviço - CAP</CalciteOption>
                  <CalciteOption value="dcvu">Ordens de serviço - DCVU</CalciteOption>
                  <CalciteOption value="podas">Ordens de serviço - PODAS</CalciteOption>
                </CalciteSelect>
              </CalciteLabel>
              <CalciteLabel> Protocolo:
            < CalciteInput placeholder="Ex: 316632-15-84" input-mode="text" onInput={handleProtocoloChange}></CalciteInput>
          </CalciteLabel>
              <CalciteLabel> Código da OS:
                <CalciteInput placeholder="" pattern="" input-mode="number"></CalciteInput>
              </CalciteLabel>
              <CalciteLabel> Lote de Pré-Planejamento::
                <CalciteInput placeholder="" pattern="" input-mode="number"></CalciteInput>
              </CalciteLabel>
              <CalciteLabel>
                Situação da OS em lotes:
                <CalciteSelect label="situação-os">
                  <CalciteOption value="qualquer">Qualquer</CalciteOption>
                  <CalciteOption value="em-lotes">Apenas OSs em lotes</CalciteOption>
                  <CalciteOption value="fora-lotes">Apenas OSs fora de lotes</CalciteOption>
                </CalciteSelect>
              </CalciteLabel>
              <CalciteLabel> selecione um ano:
              <CalciteInputNumber placeholder="Ex: 2021" step={1} min={1999} max={2024}></CalciteInputNumber>
              </CalciteLabel>
              <CalciteLabel> Abertura de:
              <CalciteInputDatePicker scale="s"></CalciteInputDatePicker>
              </CalciteLabel>
              <CalciteLabel> Abertura até:
              <CalciteInputDatePicker scale="s"></CalciteInputDatePicker>
              </CalciteLabel>
              <CalciteLabel> Último despacho de:
              <CalciteInputDatePicker scale="s"></CalciteInputDatePicker>
              </CalciteLabel>
              <CalciteLabel> Último despacho até:
              <CalciteInputDatePicker scale="s"></CalciteInputDatePicker>
              </CalciteLabel>
              <button onClick={handleSubmit}>Procurar</button>
            </CalciteBlock>
          </CalcitePanel>
    )
}

export default Procurar;