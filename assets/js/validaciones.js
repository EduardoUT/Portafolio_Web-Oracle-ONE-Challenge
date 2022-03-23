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
    
}