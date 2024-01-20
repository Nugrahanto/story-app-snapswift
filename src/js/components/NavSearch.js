import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class NavSearch extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="rounded-pill bg-white p-2 px-3 shadow search d-flex">
        <i class="bi bi-search"></i>
        <input id="searchInput" type="text" placeholder="${msg(`Search`)}">
      </div>
    `;
  }
}

customElements.define('nav-search', NavSearch);