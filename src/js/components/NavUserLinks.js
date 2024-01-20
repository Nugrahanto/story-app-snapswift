import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavUserLinks extends LitWithoutShadowDom {
  static properties = {
    label: { type: String, reflect: true },
    href: { type: String, reflect: true },
  };
 
  render() {
    return html`
      <li>
        <a class="dropdown-item" href="/${this.href}">${this.label}</a>
      </li>
    `;
  }
}

customElements.define('nav-user-links', NavUserLinks);