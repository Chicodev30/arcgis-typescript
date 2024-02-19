import {useState} from 'react';
import "./guia.css";

function Guia() {
    const [activeContentIndex, setActiveContentIndex] = useState(0);

const content = [
    [
      'Arrastar para mover',
      'SHIFT + Clique para centrar',
      'SHIFT + Arrastar para aproximar à área',
      'SHIFT + CTRL + Arrastar para afastar',
      'Mover roda de deslocação do rato para a frente para aproximar',
      'Mover roda de deslocação do rato para trás para afastar',
      'Teclas de seta para mover',
      'Tecla + para aproximar um nível',
      'Tecla - para afastar um nível',
      'Duplo clique para centrar e aproximar',
    ],
    [
      'Pesquisar por endereço',
      'Pesquisar por nome do local',
      'Pesquisar por código postal, região, etc.',
    ],
    [
      'Medir: A ferramenta de medição permite desenhar um ponto, linha, ou polígono, no mapa e especificar a unidade de medida.',
      'Imprimir: Este mapa pode ser exportado para diferentes formatos e modelos.'
    ],
    [
        'volte mais tarde'
    ]
];

return (
    <>
    <div id="tabs">
    <menu>
    <button className={activeContentIndex === 0 ? 'active' : ""}
    onClick={() => setActiveContentIndex(0)}>
    Navegação
    </button>
    <button className={activeContentIndex === 1 ? 'active' : ""}
    onClick={() => setActiveContentIndex(1)}>
    Pesquisar
    </button>
    <button className={activeContentIndex === 2 ? 'active' : ""}
    onClick={() => setActiveContentIndex(2)}>
    Ferramentas
    </button>
    <button className={activeContentIndex === 3 ? 'active' : ""}
    onClick={() => setActiveContentIndex(3)}>
    Outros
    </button>
    </menu>
    <div id='tab-content'>
    <ul>
        {content[activeContentIndex].map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
    </div>
    </div>
    </>
);
}

export default Guia;

