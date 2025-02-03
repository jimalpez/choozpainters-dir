var mapObject,
  markers = [];

var mapOptions = {
  zoom: 4,
  center: new google.maps.LatLng(37.0902, -95.7129), // United States center
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  mapTypeControl: false,
  zoomControl: true,
  scrollwheel: false,
  streetViewControl: true,
  styles: [
    {
      featureType: "landscape",
      stylers: [
        { hue: "#228B22" },
        { saturation: 43.4 },
        { lightness: 13 },
        { gamma: 1 },
      ],
    },
    {
      featureType: "road.highway",
      stylers: [
        { hue: "#FFC200" },
        { saturation: -61.8 },
        { lightness: 45.6 },
        { gamma: 1 },
      ],
    },
    {
      featureType: "water",
      stylers: [
        { hue: "#6cd2e7" },
        { saturation: -13.2 },
        { lightness: 2.4 },
        { gamma: 1 },
      ],
    },
  ],
};

mapObject = new google.maps.Map(
  document.getElementById("map_listing"),
  mapOptions,
);

// Fetch JSON file from /data/data.json
fetch("/data/data.json")
  .then((response) => response.json())
  .then((markersData) => {
    // Only process contractors' data
    if (markersData.Contractors) {
      markersData.Contractors.forEach((item) => {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            item.location_latitude,
            item.location_longitude,
          ),
          map: mapObject,
          icon: "img/pins/Doctors.png", // Assuming Contractors category
        });

        if (!markers["Contractors"]) markers["Contractors"] = [];
        markers["Contractors"].push(marker);

        google.maps.event.addListener(marker, "click", function () {
          closeInfoBox();
          getInfoBox(item).open(mapObject, this);
          mapObject.setCenter(
            new google.maps.LatLng(
              item.location_latitude,
              item.location_longitude,
            ),
          );
        });
      });
    }

    new MarkerClusterer(mapObject, Object.values(markers).flat());
  })
  .catch((error) => console.error("Error loading markers data:", error));

function hideAllMarkers() {
  for (var key in markers)
    markers[key].forEach((marker) => marker.setMap(null));
}

function toggleMarkers(category) {
  hideAllMarkers();
  closeInfoBox();
  if (!markers[category]) return;
  markers[category].forEach((marker) => marker.setMap(mapObject));
}

function closeInfoBox() {
  document.querySelectorAll("div.infoBox").forEach((el) => el.remove());
}

function getInfoBox(item) {
  return new InfoBox({
    content: `
      <div class="marker_info">
        <h3><a href="${item.url_detail}">${item.name}</a></h3>
        ${
          item.company_logo
            ? `<a href="${item.url_detail}" class="marker_info_logo">
          <img src="${item.company_logo}" alt="Logo" />
        </a>`
            : `<a href="${item.url_detail}" class="marker_info_placeholder">
              <img src="./img/logo/choozpainters-logo_white.png" alt="Logo White" />
            </a>`
        }
      </div>`,
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-125, -50), // Position above the marker
    closeBoxMargin: "",
    closeBoxURL: "img/close_infobox.png",
    isHidden: false,
    alignBottom: true,
    pane: "floatPane",
    enableEventPropagation: true,
  });
}

function onHtmlClick(location_type, key) {
  google.maps.event.trigger(markers[location_type][key], "click");
}
