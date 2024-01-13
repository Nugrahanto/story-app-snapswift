import { LitElement, html, css } from 'lit';

class ButtonCircle extends LitElement {
  static styles = css `
    :host{
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none !important;
    }

    .container-button {
      margin: auto;
      flex-grow: 1;
    }

    .content-button {
      position: fixed;
      bottom: 0;
      right: 0;
      margin-bottom: 30px;
      margin-right: 20px;
    }

    .btn-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #ffc0cb;
      color: #000;
      padding: 10px 20px;
      border: none;
      font-size: 2rem;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  `;
 
  render() {
    return html`
      <div class="container-button">
        <div class="content-button">
          <a class="btn-circle" tabindex="0" role="button" @click="${this._navigateToAddStory}">+</a>
        </div>
      </div>
    `;
  }

  _navigateToAddStory() {
    window.location.href = '/addstory.html';
  }
}

customElements.define('button-circle', ButtonCircle);