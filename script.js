function togglePopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.classList.toggle("show");
}

function edit() {
  let edit = document.getElementsByClassName("edit");
  Array.from(edit).forEach((element) =>
    element.contentEditable = true
  );
}

function save() {
  let edit = document.getElementsByClassName("edit");
  Array.from(edit).forEach((element) =>
    element.contentEditable = false
  );
}
