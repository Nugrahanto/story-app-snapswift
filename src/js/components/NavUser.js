import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class NavUser extends LitWithoutShadowDom {
 
  render() {
    return html`
      <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Nugrahanto
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
        <nav-user-links label="${`Your Activity`}" href="${``}"></nav-user-links>
        <nav-user-links label="${`Switch Account`}" href="${``}"></nav-user-links>
        <li><hr class="dropdown-divider"></li>
        <nav-user-links label="${`Log out`}" href="${``}"></nav-user-links>
      </ul>
    `;
  }
}

customElements.define('nav-user', NavUser);