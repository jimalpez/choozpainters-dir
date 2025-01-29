class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer class="footer">
            <div class="container footer_inner">
                <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                    <div class="col-md-5">
                        <img class="footer-logo" src="./img/choozpainters-logo-5_stars.png" alt="">
                        <ul class="footer-list">
                        <li>
                            <i class="bi bi-envelope"></i>
                            <span>support@choozpainters.com</span>
                        </li>
                        <li>
                            <i class="bi bi-phone"></i>
                            <span>(888) 897 – 9827</span>
                        </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h5>Legal Info</h5>
                        <ul class="footer-list">
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Cookie Policy</a>
                        </li>
                        <li>
                            <a href="#">Terms of Service</a>
                        </li>
                        <li>
                            <a href="#">Acceptable Use</a>
                        </li>
                        <li>
                            <a href="#">Manage Cookie Preferences</a>
                        </li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <h5>Quick Links</h5>
                        <ul class="footer-list">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Add your company</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="post-wrapper"">
                    <h5>Recent Posts</h5>
                    <div class="post-item">
                        <img src="./img/painter-scout-bg-home1.jpg" alt="" />
                        <div class="post-item-info">
                        <h5>Finding Trusted Painters in Your Area</h5>
                        <p>
                            When it comes to transforming your home or office, a fresh
                            coat of paint can make all…
                        </p>
                        <ul>
                            <li>
                            <i class="bi bi-calendar"></i>
                            <span>July 10</span>
                            </li>
                            <li>
                            <i class="bi bi-chat"></i>
                            <span>1 comment</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div class="container footer_base">
                <div class="row">
                <div class="col-md-8">
                    <div id="copy">Copyright © 2025</div>
                </div>
                <div class="col-md-4">
                    <ul id="additional_links">
                    <li><a href="#0">Home</a></li>
                    <li><a href="#0">Blog</a></li>
                    <li>
                        <a href="#0" class="icon"><i class="bi bi-send-fill"></i></a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
