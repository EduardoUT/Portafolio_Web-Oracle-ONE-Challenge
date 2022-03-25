export function valida(input) {
    const tipoDeInput = input.dataset.campo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("formulario-container__inputs--incorrecto");
        input.parentElement.querySelector(".formulario-container__span--error").innerHTML = "";
    } else {
        input.parentElement.classList.add("formulario-container__inputs--incorrecto");
        input.parentElement.querySelector(".formulario-container__span--error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
    }
}

const mensajeEncabezado = "Por favor, asegúrese de verificar los siguientes requerimientos: <br>";
const mensajeMaxCaracteres = "No puedes agregar más de 50 carácteres.";
const tiposDeErrores = [
    "valueMissing",
    "patternMismatch",
    "tooShort",
    "tooLong",
    "typeMismatch"
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
        valueMissing: "El campo nombre no puede estar en blanco o vacío.",
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

const validadores = {
    /*nombre: (input) => validarNombre(input),*/
};
