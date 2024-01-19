import { html } from 'lit';
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../pages/accounts/check-user-auth';

class NavUser extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }
 
  render() {
    const greetings = msg(`Hi,`);
    return html`
      <a id="username" class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${greetings} ${Utils.getUserLastName(Utils.getUserSession(Config.USER_NAME_KEY))}
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
        <nav-user-links label="${msg(`Your Activity`)}" href="${`#ya`}"></nav-user-links>
        <nav-user-links label="${msg(`Switch Account`)}" href="${`#sa`}"></nav-user-links>
        <li><hr class="dropdown-divider"></li>
        <nav-user-links label="${msg(`Log out`)}" @click=${this._userLogOut}></nav-user-links>
      </ul>
    `;
  }

  _userLogOut(event) {
    event.preventDefault();
    Utils.removeSessionStorage();
    CheckUserAuth.checkLoginState();
  }
}

customElements.define('nav-user', NavUser);