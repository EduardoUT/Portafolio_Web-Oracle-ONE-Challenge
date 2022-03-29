/**
 * @const
 * Selecciona el elemento body del sitio web.
 */
const body = document.body;
/**
 * @const
 * Selecciona al elemento header (menú) posicionado fijamente
 * en el sitio web.
 */
const menu = document.querySelector(".header-principal");
/**
 * @const
 * Asigna el nombre de una clase css titulada scroll-up.
 * 
 * Esta clase css se ubica en headerPrincipal.css
 */
const scrollArriba = "scroll-up";
/**
 * @const
 * Asigna el nombre de una clase css titula scroll-down.
 * 
 * Esta clase css se ubica en headerPrincipal.css
*/
const scrollAbajo = "scroll-down";
/**
 * @const 
 * Almacena la última posición de desplazamiento.
 */
let scrollUltimo = 0;

/**
 * Evento que detectará la posición del scroll
 */
window.addEventListener("scroll", () => {
    /**
     * @const
     * Detecta la posición actual de scroll, por medio
     * de window.scrollY.
     */
    const actualScroll = window.scrollY;
    /**
     * Si el valor es igual a cero, remueve la clase css
     * scroll-up
     */
    if (actualScroll == 0) {
        body.classList.remove(scrollArriba);
        return;
    }

    /**
     * Si el valor de actualScroll es mayor que scrollUltimo y 
     * body no posee la clase scroll-down, removerá la clase
     * scroll-arriba y agregará la clase scroll-down, de otra forma
     * realizará el procedimiento contrario.
     */
    if (actualScroll > scrollUltimo && !body.classList.contains(scrollAbajo)) {
        body.classList.remove(scrollArriba);
        body.classList.add(scrollAbajo);
    } else if (actualScroll < scrollUltimo && body.classList.contains(scrollAbajo)) {
        body.classList.remove(scrollAbajo);
        body.classList.add(scrollArriba);
    }
    /**
     * Se asignará actualScroll a scrollUltimo
     */
    scrollUltimo = actualScroll;
});

/*Creditos:
George Martsoukos
https://webdesign.tutsplus.com/es/tutorials/how-to-hide-reveal-a-sticky-header-on-scroll-with-javascript--cms-33756
*/


/**
 * @param {Object} inputs
 * Elementos input del DOM en el formulario. 
 * @param {Object} textArea 
 * Elemento textarea del DOM en el formulario.
 * @param {Object} mediaQueryMin
 * Objeto que devuelve un valor boleano en caso de cumplirse el media query, para
 * valores min-width.
 * @param {Object} mediaQueryMax 
 * Objeto que devuelve un valor boleano en caso de cumplirse el media query, para
 * valores max-width.
 * @returns void.
 * 
 * @function 
 * Cuando cualquier campo este seleccionado y contenga el foco,
 * el menú automáticamente se ocultará en inputs y textarea del formulario, 
 * esto a fin de evitar abarcar toda la pantalla mientras el teclado en Android, iOS, etc,
 * se encuentra abierto en dispositivos móviles orientados horizontalmente.
 * 
 * Cuando cualquier campo no este seleccionado y pierda el foco,
 * el menú automáticamente se mostrará de vuelta.
 * 
 * La condición permite validar un rango entre min-width y max-width en pixeles del objeto
 * MediaQueryList.
 */
export function mostrarOcultarMenu(inputs, textArea, mediaQueryMin) {
    let mostrarMenu = scrollArriba;
    let ocultarMenu = scrollAbajo;
    if (mediaQueryMin.matches) {
        inputs.forEach((input) => {
            input.addEventListener("focus", function () {
                body.classList.remove(mostrarMenu);
                body.classList.add(ocultarMenu);
            });
        
            input.addEventListener("keyup", function () {
                body.classList.remove(mostrarMenu);
                body.classList.add(ocultarMenu);
            });
            
            input.addEventListener("blur", function () {
                body.classList.remove(ocultarMenu);
                body.classList.add(mostrarMenu);
            });
        });

        textArea.addEventListener("focus", function () {
            body.classList.remove(mostrarMenu);
            body.classList.add(ocultarMenu);
        });
        
        textArea.addEventListener("blur", function () {
            body.classList.remove(ocultarMenu);
            body.classList.add(mostrarMenu);
        });
    }
    return;
}