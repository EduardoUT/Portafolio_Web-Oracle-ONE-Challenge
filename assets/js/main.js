import { valida } from "../js/validaciones.js";
import { validaTextArea } from "../js/validaciones.js";

const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("textarea");

window.addEventListener("load", function (event){
    event.preventDefault();
});

textArea.addEventListener("blur", (textArea) => {
    validaTextArea(textArea.target);
});

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});