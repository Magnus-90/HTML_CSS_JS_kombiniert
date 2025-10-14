function togglePopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.classList.toggle("show");
}

function edit() {
  let edit = document.getElementsByClassName("edit");
  Array.from(edit).forEach((element) => (element.contentEditable = true));
}

function save() {
  let edit = document.getElementsByClassName("edit");
  Array.from(edit).forEach((element) => (element.contentEditable = false));
  updateLocalStorage();
}

function updateLocalStorage() {
  const cards = [];
  document.querySelectorAll(".card").forEach((card) => {
    const name = card.querySelector(".title").innerText.trim();
    const description =
      card.querySelector(".description li")?.innerText.trim() || "";
    const imageurl = card.querySelector(".card-picture").src || "";
    cards.push({ name, description, imageurl });
  });
  localStorage.setItem("cards", JSON.stringify(cards));
}

function saveform(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const imageurl = document.getElementById("image-url").value;

  const newcard = {
    name,
    description,
    imageurl,
  };

  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.push(newcard);
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCard(newcard);
  togglePopup();
}

function loadCards() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.forEach(renderCard);
}

function renderCard(card) {
  const carddiv = document.createElement("div");
  carddiv.className = "cards";
  carddiv.innerHTML = `
  <div class="card">
      <tbody>
        <tr>
          <td>
            <img
              class="card-picture"
              src="${card.imageurl}"
              alt="Bild konnte nicht geladen werden"
            />
          </td>
          <td>
            <h1 contenteditable="false" class="title edit">
              ${card.name || "Kein Name"}
            </h1>
            <ul contenteditable="false" class="description edit">
              ${card.description || "Keine Beschreibung"}
            </ul>
          </td>
          <td>
            <div class="card-buttons">
              <button onclick="save()" class="button-safe">Safe Button</button>
              <button onclick="edit()" class="button-edit">Edit Button</button>
            </div>
          </td>
        </tr>
      </tbody>
    </div>
  `;
  document.getElementById("card-list").appendChild(carddiv);
}

window.onload = function () {
  loadCards();
};
