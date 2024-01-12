import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";

class NavUser extends LitWithoutShadowDom {
 
  render() {
    return html`
      <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Nugrahanto
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
        <li><a class="dropdown-item" href="#">Your Activity</a></li>
        <li><a class="dropdown-item" href="#">Switch Account</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Log out</a></li>
      </ul>
    `;
  }
}

customElements.define('nav-user', NavUser);