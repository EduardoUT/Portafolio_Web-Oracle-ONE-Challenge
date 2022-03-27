import { valida } from "../js/validaciones.js";
import { validaTextArea } from "../js/validaciones.js";

/**
 * @const 
 * Contiene todos los inputs existentes
 */
const inputs = document.querySelectorAll("input");
/**
 * @const
 * Contiene el elemento textarea en el formulario.
 */
const textArea = document.querySelector("textarea");


window.addEventListener("load",
    /**
     * @function
     * Evita que el formulario se envíe al cargar la
     * página.
     */
    function (event) {
        event.preventDefault();
    }
);

/**
 * Permite validar el textarea una vez el
 * campo pierde el foco.
 */
textArea.addEventListener("blur", (textArea) => {
    validaTextArea(textArea.target);
});

/**
 * Realiza un ciclo por los inputs y 
 * de forma individual valida en el caso 
 * de que se pierda el foco.
 */
inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});