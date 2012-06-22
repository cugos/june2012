var map = null;

function init(){

    // map options
    var options = {
              projection: new OpenLayers.Projection("EPSG:900913"),
              displayProjection: new OpenLayers.Projection("EPSG:4326"),
              units: "m",
              numZoomLevels: 20,
              maxResolution: 156543.0339,
              maxExtent: new OpenLayers.Bounds(-20037508, -20037508,
                                  20037508, 20037508.34)
    };
    map = new OpenLayers.Map( 'map', options );

    //  layers
    var gmap = new OpenLayers.Layer.Google(
          "Google Streets", // the default
          {'sphericalMercator': true, numZoomLevels: 20}
    );
    var osm = new OpenLayers.Layer.OSM( 
          "Open Street Maps"
    );
    
    var parcels = new OpenLayers.Layer.WMS( 
            "Parcels", 
             "http://june2012.cugos.org/wms/cugos?",
            { 
                layers: "LANGLEY_PARCEL", 
                transparent: 'true',
                format: 'image/png', 
            },
            {
                gutter: 10,
                wrapDateLine: true
            }
    );

    map.addLayers( [ osm, gmap, parcels] );

    map.addControl(new OpenLayers.Control.LayerSwitcher());

    // Coordinate display at bottom of map
    map.addControl(new OpenLayers.Control.MousePosition());
    var point = new OpenLayers.LonLat(-122.4066 , 48.033); 
    // Need to convert zoom point to mercator too
    point.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    map.setCenter(point, 14); 

}
