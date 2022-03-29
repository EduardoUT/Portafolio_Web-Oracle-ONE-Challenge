import { valida } from "../js/validaciones.js";
import { validaTextArea } from "../js/validaciones.js";
import { mostrarOcultarMenu } from "./menu.js";
import { desbloquearBotonEnviar } from "./habilitarBoton.js";
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

//const btnEnviar = document.querySelector("#btn-enviar");
//const form = document.querySelector(".formulario-container__formulario");
/**
 * @let 
 * Devuelve un valor boleano, en caso de cumplirse la coincidencia (true)
 * de tamaño mínimo en dispositivos de 768px.
 */
let mediaQueryMin = window.matchMedia("(min-width: 768px) and (max-width: 1080px)");

/**
 * @let 
 * Devuelve un valor boleano, en caso de cumplirse la coincidencia (true)
 * de tamaño máximo en dispositivos de 1080px.
 */
//let mediaQueryMax = window.matchMedia("");

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
        validarCampos(inputs, textArea);
        mostrarOcultarMenu(inputs, textArea, mediaQueryMin);
        desbloquearBotonEnviar();
    }
);

/**
 * @param {Object} inputs 
 * Todos los elementos de tipo input del DOM.
 * @param {Object} textArea 
 * Elemento textarea del DOM.
 * @returns void
 * @function
 * Realiza un ciclo através de todos los @param inputs y en cada uno hace
 * una validación en la función:
 * @function valida() la cual determina que mensaje mostrar al usuario por
 * medio de un evento blur (El campo pierde el focus).
 * 
 * El segundo evento dentro del ciclo se encarga de mantener bloqueado o
 * desbloqueado el botón de envío del formulario por medio del keyup (El usuario escribe
 * en el campo).
 * 
 * El primer evento del @param textArea 
 * Se encarga de validar que mensaje mostrar al usuario en caso de perder el focus,
 * por medio del evento blur, además de mantener el botón bloqueado o desbloqueado
 * con la segunda función.
 * 
 * El segundo evento del @param textArea
 * Se encarga de mantener bloqueado o desbloqueado el botón de envío 
 * del formulario por medio del keyup (El usuario escribe en el campo).
 */
function validarCampos(inputs, textArea) {
    inputs.forEach((input) => {
        input.addEventListener("blur", (input) => {
            valida(input.target);
            desbloquearBotonEnviar();
        });
    
        input.addEventListener("keyup", function () {
            desbloquearBotonEnviar();
        });
    });

    textArea.addEventListener("blur", (textArea) => {
        validaTextArea(textArea.target);
        desbloquearBotonEnviar();
    });
    
    textArea.addEventListener("keyup", function () {
        desbloquearBotonEnviar();
    });
    return;
}