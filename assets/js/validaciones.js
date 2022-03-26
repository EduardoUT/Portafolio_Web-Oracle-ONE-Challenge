export function valida(input) {
    const tipoDeInput = input.dataset.campo;
    let esCorrecto = false;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("formulario-container__inputs--incorrecto");
        input.parentElement.querySelector(".formulario-container__span--error").innerHTML = "";
        esCorrecto = true;
        if (tipoDeInput == tiposDeInputs[0]) {
            statusError.nombre.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[1]) {
            statusError.correo.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[2]) {
            statusError.asunto.errorSt = esCorrecto;
        }
        validarStatusError(statusError);
    } else {
        input.parentElement.classList.add("formulario-container__inputs--incorrecto");
        input.parentElement.querySelector(".formulario-container__span--error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
        esCorrecto = false;
        if (tipoDeInput == tiposDeInputs[0]) {
            statusError.nombre.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[1]) {
            statusError.correo.errorSt = esCorrecto;
        } else if (tipoDeInput == tiposDeInputs[2]) {
            statusError.asunto.errorSt = esCorrecto;
        }
        validarStatusError(statusError);
    }
}

export function validaTextArea(textArea) {
    const textAreaTipo = textArea.dataset.textarea;
    let esCorrecto = false;
    if (textArea.validity.valid) {
        textArea.parentElement.classList.remove("formulario-container__inputs--incorrecto");
        textArea.parentElement.querySelector(".formulario-container__span--error").innerHTML = "";
        esCorrecto = true;
        statusError.mensaje.errorSt = esCorrecto;
    } else {
        textArea.parentElement.classList.add("formulario-container__inputs--incorrecto");
        textArea.parentElement.querySelector(".formulario-container__span--error").innerHTML =
            mensajeDeErrorTextArea(textAreaTipo, textArea);
        esCorrecto = false;
        statusError.mensaje.errorSt = esCorrecto;
    }
}
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

function validarStatusError(statusError) {
    let nombre = statusError.nombre.errorSt;
    let correo = statusError.correo.errorSt;
    let asunto = statusError.asunto.errorSt;
    let mensaje = statusError.mensaje.errorSt;
    if ((nombre == true) && (correo == true) && (asunto == true) && (mensaje == true)) {
        document.querySelector("#btn-enviar").disabled = false;
    }
}

const mensajeEncabezado = "Por favor, asegúrese de verificar los siguientes requerimientos: <br>";
const mensajeMaxCaracteres = "No puedes agregar más de 50 carácteres.";
const tiposDeErrores = [
    "valueMissing",
    "patternMismatch",
    "tooShort",
    "tooLong",
    "typeMismatch",
];

const tiposDeInputs = [
    "nombre",
    "correo",
    "asunto",
];

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

function mensajeDeErrorTextArea(textAreaTipo, textArea) {
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if (textArea.validity[error]) {
            mensaje = mensajesDeError[textAreaTipo][error];
        }
    });
    return mensaje;
}

const validadores = {
    /*nombre: (input) => validarNombre(input),*/
};