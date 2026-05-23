const botao = document.querySelector("button");
const menu = document.querySelector(".projects");

botao.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});