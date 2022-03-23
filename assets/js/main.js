import { valida } from "../js/validaciones.js";

const inputs = document.querySelectorAll("input");

window.addEventListener("load", function (event){
    event.preventDefault();
});

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});