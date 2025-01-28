function toggleText() {
  let button = document.querySelector(".toggle-text-button");
  let textHidden = document.querySelector("#text");
 
  button.addEventListener("click", () => {
    let hidden = textHidden.getAttribute("hidden");
    if (hidden == null) {
      textHidden.setAttribute("hidden", "");
    }
    else {
      textHidden.removeAttribute("hidden");
    }
  });
}
