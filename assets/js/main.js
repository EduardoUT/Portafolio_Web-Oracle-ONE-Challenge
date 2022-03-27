import { valida } from "../js/validaciones.js";
import { validaTextArea } from "../js/validaciones.js";
import { mostrarOcultarMenu } from "./menu.js";

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

/**
 * @let 
 * Devuelve un valor boleano, en caso de cumplirse la coincidencia (true)
 * de tamaño mínimo en dispositivos de 768px.
 */
let mediaQueryMin = window.matchMedia("(min-width: 768px)");

/**
 * @let 
 * Devuelve un valor boleano, en caso de cumplirse la coincidencia (true)
 * de tamaño máximo en dispositivos de 1080px.
 */
let mediaQueryMax = window.matchMedia("(max-width: 1080px)");

window.addEventListener("load",
    /**
     * @function
     * Evita que el formulario se envíe al cargar la
     * página.
     * 
     * Contiene las siguientes funciones:
     * @function mostrarOcultarMenu
     */
    function (event) {
        event.preventDefault();
        mostrarOcultarMenu(inputs, textArea, mediaQueryMin, mediaQueryMax);
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