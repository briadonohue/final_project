mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    bounds: [-74.24250, 40.46565, -73.59283, 41.06611]
});
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    $.getJSON('data/boroughs.geojson', function (data) {
        console.log(data);
    })
   //Add borough map layer with fill and lines
    map.on('load', function () {
        map.addSource('boroughs', {
            type: 'geojson',
            data: 'data/boroughs.geojson'
        });
        map.addLayer({
            id: 'fill-boroughs',
            type: 'fill',
            source: 'boroughs',
            paint: {
                'fill-color': '#fca43f',
                'fill-opacity': 0.5
            }
        });
        map.addLayer({
            id: 'line-boroughs',
            type: 'line',
            source: 'boroughs',
            paint: {
                'line-color': '#057ffa'
            }
        });
        
       //Add popup with UHT hardship data that was mannually entered into the geojson file with the borough map
        map.on('click', ('fill-boroughs'), (e) => {
            console.log('foo', e.features)
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                    `<div>
                    <p>${e.features[0].properties.boro_name} </p>
                    <p>Housing Hardship Level: ${e.features[0].properties.housing}%</p> 
                    <p>Medical Hardship Level: ${e.features[0].properties.medical}%</p>
                    <p>Food Hardship Level: ${e.features[0].properties.food}%
                    <p>Economic Hardship Level: ${e.features[0].properties.economic}%</p>
                    </div>`
                    )
                .addTo(map);
        });
})
