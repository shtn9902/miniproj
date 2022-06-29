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
let btnfield = document.getElementById("btn-ather");
let pos = { lat: -1, lng: -1 };
function initMap(): void {
  const sydney = new google.maps.LatLng(13.006150122415388, 77.56873360623278);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(
    document.getElementById("map_ather") as HTMLElement,
    {
      center: sydney,
      zoom: 15
    }
  );
  const request1 = {
    query: "ather charging station",
    fields: ["name", "geometry"]
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(
    request1,
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          let lng_low = results[i].geometry!.viewport!.Ra.lo;
          let lng_high = results[i].geometry!.viewport!.Ra.hi;
          let lat_low = results[i].geometry!.viewport!.ub.lo;
          let lat_high = results[i].geometry!.viewport!.ub.hi;
          let lat = (lat_low + lat_high) / 2;
          let lng = (lng_low + lng_high) / 2;
          createMarker(results[i]);
          navigator.geolocation.getCurrentPosition(function (position) {
            btnfield.innerHTML = `
            <a
                href="https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude},&destination=${lat},${lng}"
                type="button"
                class="btn btn-success btn-lg"
              >
                Click For Directions
              </a>
            `;

            let curr = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(curr.lat);
            console.log(curr.lng);
            new google.maps.Marker({
              position: curr,
              map
            });
          });
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
