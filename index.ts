import './style.css';

import mapboxgl from 'mapbox-gl';

let currentBasemapID = 0;

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: { version: 8, sources: {}, layers: [] },
});

map.once('load', () => {
  map.addSource('light', {
    type: 'raster',
    tiles: ['https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'],
    tileSize: 256,
  });
  map.addLayer({
    id: '0', // Layer ID
    type: 'raster',
    source: 'light',
    layout: {
      // Make the layer visible by default.
      visibility: 'visible',
    },
  });

  map.addSource('imagery', {
    type: 'raster',
    tiles: [
      'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: '1', // Layer ID
    type: 'raster',
    source: 'imagery',
    layout: {
      // Make the layer not visible by default.
      visibility: 'none',
    },
  });

  map.addSource('earthquakes', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
  });

  map.addLayer({
    id: 'earthquakes-layer',
    type: 'circle',
    source: 'earthquakes',
    paint: {
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-color': 'red',
      'circle-stroke-color': 'white',
    },
  });
});

map.addControl(new mapboxgl.NavigationControl());

const toggleBtn = document.getElementById('toggleButton');
toggleBtn.addEventListener('click', toggleBasemaps);

function toggleBasemaps() {
  if (currentBasemapID === 0) {
    map.setLayoutProperty(0, 'visibility', 'none');
    map.setLayoutProperty(1, 'visibility', 'visible');
    currentBasemapID = 1;
  } else {
    map.setLayoutProperty(1, 'visibility', 'none');
    map.setLayoutProperty(0, 'visibility', 'visible');
    currentBasemapID = 0;
  }
}
