import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class SidebarApp extends LitWithoutShadowDom {
  static properties = {
    brandLogo: { type: String, reflect: true },
  };
 
  constructor() {
    super();
    this._checkAvailabilityProperty()
  }
 
  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandLogo')) {
      throw new Error(`Atribut "brandLogo" harus diterapkan pada elemen ${this.localName}`);
    }
  }
 
  render() {
    return html`
      <div class="d-flex pt-3">
        <button class="toggle-btn" type="button">
          <i class="bi bi-hearts"></i>
        </button>
        <div class="sidebar-logo">
          <a href="#">${this.brandLogo}</a>
        </div>
      </div>
      <ul class="sidebar-nav">
        <sidebar-links icon="bi-house-door-fill" label="${`Home`}" href="#Home"></sidebar-links>
        <sidebar-links icon="bi-compass" label="${`Discover`}" href="#Dis"></sidebar-links>
        <sidebar-links icon="bi-person" label="${`Profile`}" href="#Pro"></sidebar-links>
      </ul>
      <div class="sidebar-footer">
        <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
          <sidebar-links icon="bi-gear" label="${`Settings`}" href="#Set"></sidebar-links>
          <sidebar-links icon="bi-question-square" label="${`Help/FAQ`}" href="#Faq"></sidebar-links>
        </ul>
        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
          <i class="bi bi-grid-fill"></i>
          <span>More</span>
        </a>
      </div>
    `;
  }
}

customElements.define('sidebar-app', SidebarApp);