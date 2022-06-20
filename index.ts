/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let map: google.maps.Map;
let service: google.maps.places.PlacesService;
let infowindow: google.maps.InfoWindow;

function initMap(): void {
  const sydney = new google.maps.LatLng(13.0337095, 77.5635141);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: sydney,
    zoom: 15
  });

  const request1 = {
    query: "tata charging station",
    fields: ["name", "geometry"]
  };
  const request2 = {
    query: "ather charging station",
    fields: ["name", "geometry"]
  };

  service = new google.maps.places.PlacesService(map);
  //service2 = new google.maps.places.PlacesService(map);
  /*
  service.findPlaceFromQuery(
    request1,
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry!.location!);
      }
    }
  );
  */
  service.findPlaceFromQuery(
    request2,
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry!.location!);
      }
    }
  );
}

function createMarker(place: google.maps.places.PlaceResult) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
