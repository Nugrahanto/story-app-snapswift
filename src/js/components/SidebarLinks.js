import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class SidebarLinks extends LitWithoutShadowDom {
  static properties = {
    icon: { type: String },
    label: { type: String },
    href: { type: String },
  };
 
  constructor() {
    super();
  }
 
  render() {
    return html`
    <li class="sidebar-item">
      <a href="${this.href}" class="sidebar-link">
        <i class="bi ${this.icon}"></i>
        <span>${this.label}</span>
      </a>
    </li>
    `;
  }
}

customElements.define('sidebar-links', SidebarLinks);