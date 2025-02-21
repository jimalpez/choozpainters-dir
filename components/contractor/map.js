export class ContractorMap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.latitude = parseFloat(this.getAttribute("data-latitude")) || 37.0902; // Default to USA center
    this.longitude =
      parseFloat(this.getAttribute("data-longitude")) || -95.7129;
    this.image = this.getAttribute("data-image") || "https://via.placeholder.com/150";

    this.innerHTML = `
      <div class="margin_60">
        <h4 class="heading_contractor-sm">Map</h4>
        <div id="map_listing" class="contactor_page_map"></div>
      </div>
    `;

    this.initMap();
  }

  async initMap() {
    if (!window.google) {
      console.error("Google Maps API is not loaded.");
      return;
    }

    const mapOptions = {
      zoom: 9, // Increased zoom for a more localized view
      center: new google.maps.LatLng(this.latitude, this.longitude),
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

    this.mapObject = new google.maps.Map(
      this.querySelector("#map_listing"),
      mapOptions
    );

    // Add a pinpoint marker for the location
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.latitude, this.longitude),
      map: this.mapObject,
      title: "Selected Location",
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="text-align:center;"><h3>Selected Location</h3><img src="${this.image}" alt="Location Image" style="width:100px;height:auto;"></div>`
    });

    marker.addListener("click", () => {
      infoWindow.open(this.mapObject, marker);
    });
  }
}
customElements.define("contractor-map", ContractorMap);
