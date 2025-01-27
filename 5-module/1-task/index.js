function hideSelf() {
  let button = document.querySelector(".hide-self-button");
  button.addEventListener("click", hidden);
  function hidden() {
    button.setAttribute("hidden", "");
  }
}
