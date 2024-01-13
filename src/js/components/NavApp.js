import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
    pageType: { type: String, reflect: true },
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
        <div class="container-fluid mt-4 mx-3">
          ${this.pageType === 'dashboard' ? html`<a class="navbar-brand">${this.brandName}</a>` : ''}
          ${this.pageType === 'addstory' ? html`<a class="navbar-brand d-block">Add Story</a>` : ''}
          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav me-auto mb-lg-0">
              <li class="nav-item mb-3">
                ${this.pageType === 'dashboard' ? html`<nav-search></nav-search>` : ''}
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