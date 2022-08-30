import { habilitarBotonEnviar } from "./formulario/habilitarBoton.js";
import menu from "../js/componentes/menu.js";
import validarCampos, { limpiarCampos } from "./formulario/validarCampos.js";

(() => {
    /**
     * @const
     * Contiene el elemento form del DOM.
     */
    const formularioContacto = document.querySelector(".formulario");

    menu();
    validarCampos();
    habilitarBotonEnviar();

    /**
     * Usando delegación de eventos para inputs y textarea.
     * Cuando el usuario escriba en los campos de tipo input
     * o textArea se ejecutará la función habilitarBotonEnviar
     * para comprobar si se desbloqueará el botón.
     */
    const validarBtnFormulario = (event) => {
        const element = event.target;
        if (element && element.tagName == 'INPUT') {
            habilitarBotonEnviar();
        } else if (element && element.tagName == 'TEXTAREA') {
            habilitarBotonEnviar();
        }
    }

    formularioContacto.addEventListener("keyup", validarBtnFormulario);
    window.addEventListener("DOMContentLoaded", limpiarCampos);
})();