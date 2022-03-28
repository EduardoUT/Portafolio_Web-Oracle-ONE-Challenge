/**
 * @function
 * Permite validar si el valor de todos los campos del formulario no 
 * se encuentren en blanco.
 * 
 * El botón enviar se mostrará inhabilitado en caso de estar vacio al menos un campo.
 * 
 * Si todos los campos del formulario son validos con el objeto
 * validity.valid, el botón de enviar se deshabilitará.
 */
export function desbloquearBotonEnviar() {
    let nombre = document.getElementById("nombre");
    let correo = document.getElementById("email");
    let asunto = document.getElementById("asunto");
    let mensaje = document.getElementById("mensaje");
    let btnEnviar = document.getElementById("btn-enviar");
    let nombreValido = nombre.validity.valid;
    let correoValido = correo.validity.valid;
    let asuntoValido = asunto.validity.valid;
    let mensajeValido = mensaje.validity.valid;

    if (nombreValido && correoValido && asuntoValido && mensajeValido) {
        btnEnviar.removeAttribute("disabled");
        btnEnviar.classList.remove("deshabilitar-btn");
    } else {
        btnEnviar.setAttribute("disabled", "true");
        btnEnviar.classList.add("deshabilitar-btn");
    }
}

