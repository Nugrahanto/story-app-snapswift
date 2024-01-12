import { LitElement, css, html } from 'lit';

class FooterApp extends LitElement {
  static properties = {};
 
  constructor() {
    super();
  }

  static styles = css`
  :host {
    font-family: 'Signika', sans-serif;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    color: #ffc0cb;
  }

  .about-title {
    margin: 0;
  }

  .about-description {
    text-align: justify;
    color: #6c757d;
    font-size: smaller;
  }

  .about-text {
    display: flex;
    align-items: center;    
    font-size: smaller;
  }

  .select-locale {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background: none;
    border-radius: .25rem;
    font-family: 'Signika', sans-serif;
    height: fit-content;
  }

  .select-locale:active,
  .select-locale:focus {
    outline: 0;
  }

  span {
    padding: 0px 10px;
  }

  `;
 
  render() {
    return html`
      <p class="about-title">About Snapswift</p>
      <p class="about-description">
        Snapswift is an application designed to provide users with an engaging platform for creating, sharing, and exploring stories. Whether it's through captivating images and descriptions, SnapSwift aims to foster a creative space where users can express themselves and connect with a community of visual storytellers.
      </p>
      <div class="about-text">
        <select class="select-locale">
          <option selected>Languange</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <span>•</span>
        <p>© 2024 <a href="https://github.com/Nugrahanto/story-app-snapswift" target="_blank">Snapswift - Nugrahanto</a></p>
      </div>
    `;
  }
}

customElements.define('footer-app', FooterApp);