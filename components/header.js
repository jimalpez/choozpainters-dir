const getData =
  "https://nrroyfmyiff6qhks7i2xdmgcxu0erbid.lambda-url.us-east-1.on.aws/";

class Header extends HTMLElement {
  constructor() {
    super();
    window.addEventListener("scroll", () => {
      const header = this.querySelector(".header_sticky");
      const logo = this.querySelector(".logo");

      if (window.innerWidth < 768 && window.scrollY > 0) {
        logo.src = "/img/choozpainters-small-logo_trp_back.png";
        logo.width = "35";
      } else {
        logo.src = "/img/logo/chooz_painters_logo.png";
        logo.width = "130";
      }

      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch(getData);
      const data = await response.json(); // Assuming the response is in JSON format

      // Filter and log the city values
      const cities = data.filter((item) => item.city).map((item) => item.city);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  get classes() {
    return this.getAttribute("class") || "";
  }

  toggleMobileMenu() {
    const menu = this.querySelector(".main-menu");
    if (menu.style.left === "100%") {
        menu.style.left = "-100%"; // Hide menu when clicked again
    } else {
        menu.style.left = "100%"; // Show menu
    }
}

  connectedCallback() {
    const classLogo = this.getAttribute("class-logo") || "logo-default";

    this.innerHTML = `
        <header class="header_sticky">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-6">
                      <a href="/" class="logo-holder">
                          <!-- <div class="main-logo ${classLogo}"></div> -->
                          <img class="logo" src="/img/logo/chooz_painters_logo.png" alt="Chooz Painters Logo" width="130" height="auto" />
                      </a>
                    </div>
                    <nav class="col-lg-9 col-6">
                      <a class="cmn-toggle-switch cmn-toggle-switch__htx open_close" href="#0">
                          <span>Menu mobile</span>
                      </a>
                      <ul id="top_access">
                          <li>
                            <a href="login.html"><i class="pe-7s-user"></i></a>
                          </li>
                          <li class="only-mobile">
                            <a href="register-doctor.html">
                              <i class="pe-7s-add-user"></i>
                            </a>
                          </li>
                          <li class="only-desktop">
                            <a href="register-doctor.html" class="btn_1 small white">
                              <span class="plus">+</span> <span> Claim Page </span>
                            </a>
                          </li>
                      </ul>
                      <div class="main-menu">
                          <ul>
                            <li class="submenu">
                                <a href="#0" class="show-submenu">Blog</a>
                            </li>
                            <li class="submenu">
                                <a href="#" class="show-submenu">Pages</a>
                                <ul class="submenu-dropdown">
                                    <li><a href="/pricing.html">Pricing</a></li>
                                    <li><a href="/list.html">Listing</a></li>
                                    <li><a href="/contractor_page.html">Profile</a></li>
                                    <li><a href="/missouri/ballwin/painting-contractors/astra-painters/">Profile Backend</a></li>
                                </ul>
                            </li>
                          </ul>
                      </div>
                      <!-- /main-menu -->
                    </nav>
                </div>
            </div>
        </header>
    `;

    this.querySelector(".cmn-toggle-switch").addEventListener("click", (event) => {
      event.preventDefault();
      this.toggleMobileMenu();
  });
  }
}

customElements.define("header-component", Header);
