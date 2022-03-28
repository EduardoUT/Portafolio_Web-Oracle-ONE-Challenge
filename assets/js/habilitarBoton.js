/**
 * @function
 * Permite validar si el valor de todos los campos del formulario cumplan
 * con las propiedades del objeto validity.
 * 
 * El botón enviar se mostrará inhabilitado en caso de estar vacio al menos un campo,
 * se agregará la propiedad disabled por medio de setAttribute y el estilo css
 * que anula el pointer-event, además de pintar el borde y fondo de color gris.
 * 
 * Si todos los campos del formulario son validos con el objeto
 * validity.valid, el botón de enviar se deshabilitará, se quitará la propiedad
 * disabled y se removerá el estilo de color gris, volviendo a su estado original.
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