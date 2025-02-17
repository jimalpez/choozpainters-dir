export class ContractorMap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.latitude = parseFloat(this.getAttribute("data-latitude")) || 37.0902; // Default to USA center
    this.longitude =
      parseFloat(this.getAttribute("data-longitude")) || -95.7129;

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
      zoom: 10, // Increased zoom for a more localized view
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
      mapOptions,
    );

    this.markers = [];

    try {
      const response = await fetch("/data/data.json");
      const markersData = await response.json();
      this.loadMarkers(markersData);
    } catch (error) {
      console.error("Error loading markers data:", error);
    }
  }
}
customElements.define("contractor-map", ContractorMap);
