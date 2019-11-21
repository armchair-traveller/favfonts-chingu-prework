"use strict"

const initState = {
  previewText: [
    "Great fonts are not born great, they grow great.",
    "Never hate your fonts. It affects your judgment.",
    "FOUT is a dish that tastes best when served cold.",
    "A man who doesn't spend time with responsive typography can never be a real man.",
    "Responsive type is everything. Responsive type is more than FOUT mitigation. It is more than performance. It is almost the equal of readability."
  ]
};

// Reset button event handler
const resetBtn = document.querySelector(".reset-btn");
resetBtn.onclick = () => {
  // Reset functionality
  if (searchBar.value) {
    searchBar.value = "";
    Card.prototype.sortedCards.forEach(card => {
      card.hide();
      card.show();
    });
  }
  if (previewInput.value) {
    previewInput.value = "";
    Card.prototype.sortedCards.forEach(card => {
      card.setText(randomPreviewText());
    });
  }
  if (!(fontSize.value == "24px")) {
    fontSize.value = "24px";
    Card.prototype.sortedCards.forEach(card => {
      card.setFontSize("24px");
    });
  }
};

// Font search event handler
const searchBar = document.querySelector(".search-bar");
searchBar.oninput = e => {
  let v = e.target.value.toLowerCase();
  if (v) {
    Card.prototype.sortedCards.forEach(card => {
      if (card.family.toLowerCase().includes(v)) {
        card.hide();
        card.show();
      } else {
        card.hide();
      }
    });
  } else {
    Card.prototype.sortedCards.forEach(card => {
      card.hide();
      card.show();
    });
  }
};

// Font preview event handler
const previewInput = document.querySelector(".preview-input");
previewInput.oninput = e => {
  Card.prototype.sortedCards.forEach(card => {
    if (e.target.value) {
      card.setText(e.target.value);
    } else {
      card.setText(randomPreviewText());
    }
  });
};

// Generate random placeholder text
function randomPreviewText(arr = initState.previewText) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Font size event handler
const fontSize = document.querySelector(".font-size-drop");
fontSize.onchange = e => {
  Card.prototype.sortedCards.forEach(card => {
    card.setFontSize(e.target.value);
  });
};

// Back to top button handler & observer
const bttBtn = document.querySelector(".back-to-top");
const bttObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      bttBtn.style.display = "none";
    } else {
      bttBtn.style.display = "";
    }
  }
});
bttObserver.observe(searchBar);

// Card observer.
let observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      Card.prototype.Cards[entry.target.innerHTML].activate();
    }
  }
});

// Select main card area, for Card blueprint
let cardArea = document.querySelector(".card-area");
// Font card blueprint
class Card {
  constructor(fontObj) {
    this.status = "pending";
    this.family = fontObj.family;
    this.link = fontObj.files[fontObj.variants[0]];
    this.link = "https" + this.link.substring(4);
    this.createCard();
    this.setText(randomPreviewText());
    observer.observe(this.fontTitle);
    Card.prototype.Cards[this.fontTitle.innerHTML] = this;
  }
  createCard() {
    // Creates card HTML elements w/ all children and required object properties
    this.element = document.createElement("article");
    this.element.className = "font-card";
    this.fontTitle = document.createElement("h2");
    this.fontTitle.className = "font-title";
    this.fontTitle.innerText = this.family;
    this.fontTitle.innerHTML = this.family;
    this.fontTitle = this.element.appendChild(this.fontTitle);
    let addBtn = document.createElement("button");
    addBtn.className = "add-btn";
    addBtn.innerText = "+";
    this.element.appendChild(addBtn);
    this.fontPreview = document.createElement("p");
    this.fontPreview.className = "font-preview";
    this.fontPreview = this.element.appendChild(this.fontPreview);

    // Append to DOM.
    cardArea.appendChild(this.element);
    this.invisible();
  }
  createObserver(observer) {
    observer.observe(this.element);
  }
  show() {
    this.element.style.display = "";
  }
  hide() {
    this.element.style.display = "none";
  }
  setText(v) {
    this.fontPreview.innerText = v;
  }
  setFontSize(v) {
    this.fontPreview.style.fontSize = v;
  }
  visible() {
    if (this.status == "active") {
      this.element.style.visibility = "";
      this.element.style.opacity = "1";
    }
  }
  invisible() {
    this.element.style.visibility = "hidden";
    this.element.style.opacity = "0";
  }
  safeRender() {
    if (this.status == "active") {
      this.visible();
    } else {
      this.hide();
    }
  }
  activate() {
    if (this.status == "pending") {
      this.status = "active";
      let font = new FontFace(this.family, `url(${this.link})`);
      document.fonts.add(font);
      this.fontPreview.style.fontFamily = `'${this.family}'`;
      font.loaded.then(() => {
        this.safeRender();
      });
      observer.unobserve(this.fontTitle);
    } else {
      this.safeRender();
    }
  }
}
// Font cards, sorted by popularity
Card.prototype.sortedCards = [];
// Font cards, assigned by family name
Card.prototype.Cards = {};

// Fetch Google Web Fonts API
const webFonts = fetch(
  "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAcrD-evUNr-aGATMsbR7Yx5KSwYbqeLLU&sort=popularity"
);
webFonts
  .then(data => data.json())
  .then(json => {
    json.items.forEach(item => {
      Card.prototype.sortedCards.push(new Card(item));
    });
  });
