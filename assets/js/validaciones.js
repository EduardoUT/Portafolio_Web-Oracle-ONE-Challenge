export function valida(input) {
    const tipoDeInput = input.dataset.campo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
}

const validadores = {
    nombre: (input) => validarNombre(input),
};

function validarNombre(input) {
    const expresionNombre = /^(?=.{3,50}$)([A-ZÁÉÍÓÚ][a-záéíóúñ]+(?:[\s][A-ZÁÉÍÓÚ][a-záéíóúñ]+)+)$/g
    const nombreUsuario = input.value;
    let mensaje = "";

    console.log(expresionNombre.test(nombreUsuario));
    if (nombreUsuario == "") {
        mensaje = "Este campo no puede estar en blanco o vacío.";
        input.setCustomValidity(mensaje);
    }
}