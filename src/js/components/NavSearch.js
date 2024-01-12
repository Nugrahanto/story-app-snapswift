import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class NavSearch extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="rounded-pill bg-white p-1 px-3 shadow me-5 search">
        <i class="bi bi-search"></i>
        <input id="searchInput" class="me-5" type="text" placeholder="Search">
      </div>
    `;
  }
}

customElements.define('nav-search', NavSearch);