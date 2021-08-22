

import * as React from "react";
 import { useEffect, useState, useRef } from "react";

import { useGoogleMaps } from "react-hook-google-maps";
 
const MapDrawer = ({ destination, pickup }) => {


const prevMarkersRef = useRef([]);

  // incoming location to set
  let [point, setPoint] = useState({
    lat: 0, lng: 0
  });

  let [dest, setDest] = useState({
    lat: 0, lng: 0
  });

  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyAH-**********-0CcdK_q5u-UBlQY",
    // NOTE: even if you change options later
    {
      center: point,
      zoom: 15,
    },
  );

  useEffect(()=>{
	setPoint(pickup);
	setDest(destination);
  },[destination, pickup])

  React.useEffect(() => {
    if (map) {
      // ADD MARKER
      const m = addMarker();
      clearMarkers(prevMarkersRef.current); //clear prev markers
      prevMarkersRef.current.push(m);
      map.setCenter(point);
      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      calcRoute(directionsService, directionsRenderer);
    }
  }, [point]); 

  // SIDE FUNCTIONS
  function addMarker() {
    return new window.google.maps.Marker({
      position: point,
      map: map
    });
  }
  function clearMarkers(markers) { 
    for (let m of markers) {
      m.setMap(null);
    }
  }

  function calcRoute(directionsService, directionsRenderer) {
    let request = {
      origin: point,
      destination: dest,
      travelMode: "DRIVING"
    };
    directionsService.route(request, function(result, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }

//   console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
//   console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};
 
export {MapDrawer};

