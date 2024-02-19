import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação atualizada


// Import calcite components
import '@esri/calcite-components/dist/calcite/calcite.css';
import "@arcgis/core/assets/esri/themes/light/main.css";

// Set the asset path for calcite components
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath(window.location.href);

import App from './App.tsx';
import './index.css';

// Nova forma de renderizar o aplicativo no React 18+
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)