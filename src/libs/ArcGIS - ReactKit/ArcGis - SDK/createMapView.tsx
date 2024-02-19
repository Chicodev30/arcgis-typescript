import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";



interface ICreateMapView {
    container: HTMLDivElement,
    mapProperties?: __esri.MapProperties,
}

export const createMapView = (args: ICreateMapView) => {
    const { mapProperties, container } = args;
    
    const map = new Map(
        { basemap: 'gray',
        ...mapProperties }
        );

    return new MapView({
        map: map,
        container: container,
        center: [-51.2177, -30.0346], // Coordenadas do centro
        zoom: 16
    });

} 

