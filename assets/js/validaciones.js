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
 * @const
 * Arreglo con los distintos tipos de inputs en el 
 * formulario, acorde al dataset.campo.
 */
const tiposDeInputs = [
    "nombre",
    "correo",
    "asunto",
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
    /**
     * @let
     * Variable boleana que permitirá saber si un
     * input cumple o no con una validación.
     */
    let esCorrecto = false;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("formulario-container__inputs--incorrecto");
        input.parentElement.querySelector(".formulario-container__span--error").innerHTML = "";
        /**
         * Si hay una coincidencia entre el arreglo tiposDeInputs[]
         * y tipoDeInput, se alterará el valor boleano de la propiedad 
         * errorSt del objeto statusError, asignandole el valor
         * de la variable esCorrecto, en este caso true.
         */
        esCorrecto = true;
        if (tipoDeInput == tiposDeInputs[0]) {
            statusError.nombre.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[1]) {
            statusError.correo.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[2]) {
            statusError.asunto.errorSt = esCorrecto;
        }
        desbloquearBotonEnviar(statusError);
    } else {
        input.parentElement.classList.add("formulario-container__inputs--incorrecto");
        input.parentElement.querySelector(".formulario-container__span--error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
        /**
         * Si hay una coincidencia entre el arreglo tiposDeInputs[]
         * y tipoDeInput, se alterará el valor boleano de la propiedad 
         * errorSt del objeto statusError, asignandole el valor
         * de la variable esCorrecto, en este caso false.
         */
        esCorrecto = false;
        if (tipoDeInput == tiposDeInputs[0]) {
            statusError.nombre.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[1]) {
            statusError.correo.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[2]) {
            statusError.asunto.errorSt = esCorrecto;
        }
        desbloquearBotonEnviar(statusError);
    }
}

/**
 * 
 * @param {Object} textArea
 * Elemento textarea del DOM en el formulario.
 * @function
 * Realiza la validación similar a la función valida
 *  
 */
export function validaTextArea(textArea) {
    const textAreaTipo = textArea.dataset.textarea;
    let esCorrecto = false;
    if (textArea.validity.valid) {
        textArea.parentElement.classList.remove("formulario-container__inputs--incorrecto");
        textArea.parentElement.querySelector(".formulario-container__span--error").innerHTML = "";
        /**
         * En caso de ser true el resultado de esCorrecto,
         * altera el valor de la propiedad errorSt del objeto
         * statusError.
         */
        esCorrecto = true;
        statusError.mensaje.errorSt = esCorrecto;
    } else {
        textArea.parentElement.classList.add("formulario-container__inputs--incorrecto");
        textArea.parentElement.querySelector(".formulario-container__span--error").innerHTML =
            mensajeDeErrorTextArea(textAreaTipo, textArea);
        /**
         * En caso de ser false el resultado de esCorrecto,
         * altera el valor de la propiedad errorSt del objeto
         * statusError.
         */
        esCorrecto = false;
        statusError.mensaje.errorSt = esCorrecto;
    }
}

/**
 * 
 * @param {Object} statusError 
 * 
 * @function
 * Función que permite obtener como parámetro el objeto
 * statusError.
 * 
 * Una vez obtenido, se asigna a las variables nombre, correo, asunto
 * y mensaje el contenido de la propiedad boleana errorSt, obtenidas
 * en las funciones
 * @function valida
 * @function validaTextArea
 * 
 * En caso de ser todas true, el botón de enviar
 * se deshabilita.
 */
function desbloquearBotonEnviar(statusError) {
    let nombre = statusError.nombre.errorSt;
    let correo = statusError.correo.errorSt;
    let asunto = statusError.asunto.errorSt;
    let mensaje = statusError.mensaje.errorSt;
    if ((nombre == true) && (correo == true) && (asunto == true) && (mensaje == true)) {
        document.querySelector("#btn-enviar").disabled = false;
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
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

/**
 * 
 * @param {Object} textAreaTipo 
 * Valor del objeto textarea.
 * @param {string} textArea 
 * Valor del tipo de elemento acorde a la propiedad data- del DOM.
 * @returns Mensaje de tipo string del 
 * tipo de error acorde al tipo de input mensajesDeError y
 * del objeto ValidityState.
 * @function
 * Permite obtener el mensaje de error acorde a el arreglo de tipos
 * de errores, y el objeto ValidityState, en caso de coincidir,
 * se mostrará el mensaje contenido en el objeto mensajesDeError.
 */
function mensajeDeErrorTextArea(textAreaTipo, textArea) {
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if (textArea.validity[error]) {
            mensaje = mensajesDeError[textAreaTipo][error];
        }
    });
    return mensaje;
}

/**
 * @const 
 * Objeto que contiene el nombre de la propiedades acorde
 * al data- del DOM, posee propiedades hijas de tipo
 * boleanas inicializadas en false, estas cumplen la función
 * de comprobar si un input cumple o no con las validaciones.
 */
const statusError = {
    nombre: {
        errorSt: false,
    },
    correo: {
        errorSt: false,
    },
    asunto: {
        errorSt: false,
    },
    mensaje: {
        errorSt: false,
    },
};

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
        tooShort: "Debe contener mínimo 5 carácteres",
    }
};

/**
 * Objeto opcional que contendrá validaciones específicas
 * cuyos mensajes de error serán customizados.
 */
const validadores = {
};