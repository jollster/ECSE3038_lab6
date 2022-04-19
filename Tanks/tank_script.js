const template = document.createElement("template");
template.innerHTML = 
`
  <div class="tank-card-container">

    <div class="card-image">
      <img class="card-image-image" src="./assets/water-tank.png" alt="" />
    </div>


    <div class="card-icons">
      <div class="tank-card-delete">
        <img class="tank-card-delete-icon" src="./assets/trash.png"/>
      </div>
    </div>

    <div class="card-stats">
      <div class="card-stats-inner">
        <span class="location"></span>
        <span class="long"></span>
        <span class="latitude"></span>
        <span class="perc"></span>
      </div>
      <div class="card-stats-inner"></div>
    </div>
  </div>
`;

class TankCard extends HTMLElement {
  static get observedAttributes() {
    return ["loc", "long", "lat", "percentage_full", "image", "tank_id"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "loc") {this.shadowRoot.querySelector(".location").innerHTML = "location: " + newValue;
    }
    if (attrName == "long") {this.shadowRoot.querySelector(".long").innerHTML = "longitude: " + newValue;
    }
    if (attrName == "lat") {this.shadowRoot.querySelector(".latitude").innerHTML = "latitude: " + newValue;
    }
    if (attrName == "percentage_full") {this.shadowRoot.querySelector(".perc").innerHTML = "percentage_full: " + newValue;
    }

    if (attrName == "image") {this.shadowRoot.querySelector(".card-image-image").src = newValue;
    }
    if (attrName == "tank_id") {this.shadowRoot.querySelector(".tank-card-delete").setAttribute("tank_id", newValue);
    }
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", "Tanks/tank_style.css");
    this.shadowRoot.appendChild(css);

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".tank-card-delete").addEventListener("click", function (e) {
      console.log(e.target.parentNode.getAttribute("tank_id"));

      var tankID = e.target.parentNode.getAttribute("tank_id");
      fetch("http://localhost:3000/data/" + tankID, {
        method: "DELETE",
      }).then(() => location.reload())
    });
  }
}

window.customElements.define("tank-card", TankCard);