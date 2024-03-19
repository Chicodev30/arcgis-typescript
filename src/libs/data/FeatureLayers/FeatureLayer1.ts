import PopupTemplate from "@arcgis/core/PopupTemplate";

const featureLayer1 = {
    url: "https://mapaspoa-prod-2020.procempa.com.br/arcgis/rest/services/DEP/WGS84_OSDEP_SOLICITACOES/MapServer/0",
    popupTemplate: new PopupTemplate({
        title: "Numero do protocolo <b>{NRPROTOCOLO}</b> aberto em <b>{DTABERTURA}</b>",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "NRSOLICITACAO",
                label: "Numero da solicitação:",
              },
              {
                fieldName: "NRCEP",
                label: "CEP",
              },
              {
                fieldName: "DSPRAZO",
                label: "DS prazo",
              },
              {
                fieldName: "DSLOGRADOURO",
                label: "Logradouro",
              },
              {
                fieldName: "NRLOGRADOURO",
                label: "Numero do logradouro",
              },
              {
                fieldName: "NMCOMPLEMENTOLOGRADOURO",
                label: "Complemento",
              },
            ],
          },
        ],
    })
  };

export default featureLayer1;


