import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };
 
  constructor() {
    super();
    this._checkAvailabilityProperty()
  }
 
  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(`Atribut "brandName" harus diterapkan pada elemen ${this.localName}`);
    }
  }
 
  render() {
    return html`
    <div class="navbar-wrapper">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid my-4 mx-3">
          <a class="navbar-brand">${this.brandName}</a>
          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav me-auto mb-lg-0">
              <li class="nav-item mb-3">
                <nav-search class="d-flex"></nav-search>
              </li>
              <li class="nav-item mb-3">
                <button-create></button-create>
              </li>
            </ul>
            <li class="nav-item dropdown me-5 mb-3">
              <nav-user></nav-user>
            </li>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
    `;
  }
}

customElements.define('nav-app', NavApp);