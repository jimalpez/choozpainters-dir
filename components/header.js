class Header extends HTMLElement {
  constructor() {
    super();
    window.addEventListener("scroll", () => {
      const header = this.querySelector(".header_sticky");
      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
  }

  get classes() {
    return this.getAttribute("class") || "";
  }

  connectedCallback() {
    this.innerHTML = `
        <header class="header_sticky">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-6">
                    <a href="/">
                        <div class="main-logo"></div>
                    </a>
                    </div>
                    <nav class="col-lg-9 col-6">
                    <a
                        class="cmn-toggle-switch cmn-toggle-switch__htx open_close"
                        href="#0">
                        <span>Menu mobile</span>
                    </a>
                    <ul id="top_access">
                        <li>
                        <a href="login.html"><i class="pe-7s-user"></i></a>
                        </li>
                        <li class="only-mobile">
                        <a href="register-doctor.html"
                            ><i class="pe-7s-add-user"></i
                        ></a>
                        </li>
                        <li class="only-desktop">
                        <a href="register-doctor.html" class="btn_1 small white">
                            <span class="plus">+</span> <span> Add You Company </span>
                        </a>
                        </li>
                    </ul>
                    <div class="main-menu">
                        <ul>
                        <li class="submenu">
                            <a href="#0" class="show-submenu">Blog</a>
                        </li>
                        <li class="submenu">
                            <a href="#0" class="show-submenu">Search</a>
                        </li>
                        </ul>
                    </div>
                    <!-- /main-menu -->
                    </nav>
                </div>
            </div>
        </header>
    `;
  }
}

customElements.define("header-component", Header);
