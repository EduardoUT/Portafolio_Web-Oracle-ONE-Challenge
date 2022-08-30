/**
 * @const
 * Mensaje para primera línea de error en el objeto:
 * @const MensajesDeError
 */
const mensajeEncabezado = "Por favor, asegúrese de verificar los siguientes requerimientos: <br>";

/**
 * @const 
 * Mensaje para propiedad tooLong, en el objeto:
 * @const MensajesDeError
 */
const mensajeMaxCaracteres = "No puedes agregar más de 50 carácteres.";

/**
 * @const 
 * Arreglo con los nombres de los distintos tipos de errores 
 * del objeto ValidityState.
 */
const tiposDeErrores = [
    "valueMissing",
    "patternMismatch",
    "tooShort",
    "tooLong",
    "typeMismatch",
];

/**
 * 
 * @param {Object} input 
 * Elemento input del DOM en el formulario.
 * @function
 * Se exportará al archivo main.js
 * 
 * Permite validar un input, en caso de ser valido:
 * 
 * --Remueve la clase css formulario-container__inputs--incorrecto
 * 
 * --Esta a su vez selecciona el elemento span de error formulario-container__span--error
 * 
 * De lo contrario:
 * 
 * --Agrega la clase css formulario-container__inputs--incorrecto
 * 
 * --Selecciona al elemento span de error formulario-container__span--error
 * 
 * @function mostrarMensajeDeError
 * 
 * Será mostrado en el elemento span, por medio del innerHTML.
 */
export function valida(input) {
    /**
     * @const {string}
     * Variable que contiene el tipo de dataset, obtenido
     * de la propiedad data- del DOM.
     */
    const tipoDeInput = input.dataset.campo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("formulario__campos--incorrecto");
        input.parentElement.querySelector(".formulario__span--error").innerHTML = "";
    } else {
        input.parentElement.classList.add("formulario__campos--incorrecto");
        input.parentElement.querySelector(".formulario__span--error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
    }
}

/**
 * 
 * @param {string} tipoDeInput 
 * Valor del tipo de input acorde a la propiedad data- del DOM.
 * @param {Object} input 
 * Valor del objeto input.
 * @returns Mensaje de tipo string del 
 * tipo de error acorde al tipo de input mensajesDeError y
 * del objeto ValidityState.
 * @function
 * Permite obtener el mensaje de error acorde a el arreglo de tipos
 * de errores, y el objeto ValidityState, en caso de coincidir,
 * se mostrará el mensaje contenido en el objeto mensajesDeError.
 */
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if (input.validity[error]) {
            /*
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            */
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

/**
 * @const
 * Objeto con las propiedades nombradas acorde a la propiedad
 * data- del DOM, posee propiedades hijas acorde al nombre
 * de los tipos de errores del objeto ValidityState.
 */
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar en blanco o vacío.",
        patternMismatch:
            mensajeEncabezado +
            "Debes incluir por lo menos un apellido. <br>" +
            "Sólo la primera letra de los nombres y apellidos debe ser mayúscula. <br>" +
            "No puede haber más de un espacio en blanco. <br>",
        tooShort: "El valor mínimo requerido de carácteres es de 3.",
        tooLong: mensajeMaxCaracteres,
    },
    correo: {
        valueMissing: "El campo correo no puede estar en blanco o vacío.",
        patternMismatch: "El formato admitido debe ser en formato correousuario@dominio.com",
        typeMismatch:
            "Deber estar en formato e-mail conteniendo el caracter especial @ " +
            "seguido de un dominio o proveedor seguido de un punto(.).",
    },
    asunto: {
        valueMissing: "El campo asunto no puede estar en blanco o vacío.",
        patternMismatch:
            mensajeEncabezado +
            "No se admiten números ni carácteres especiales, solo texto. <br>" +
            "No puede haber más de un espacio en blanco entre palabras",
        tooShort: "Debes ingresar mínimo 6 carácteres",
        tooLong: mensajeMaxCaracteres,
    },
    mensaje: {
        valueMissing: "El campo mensaje no puede estar en blanco o vacío.",
        tooLong: "Debe contener máximo 300 carácteres",
        tooShort: "Debe contener mínimo 20 carácteres",
    }
};

/**
 * Objeto opcional que contendrá validaciones específicas
 * cuyos mensajes de error serán customizados.
 */
const validadores = {
};