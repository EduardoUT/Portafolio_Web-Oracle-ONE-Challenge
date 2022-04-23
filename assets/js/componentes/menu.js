import mediaQueryCelularHorizontal from "./mediaQuery.js";

/**
 * @const
 * Selecciona el elemento body del sitio web.
 */
 const body = document.body;

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
  * Contiene funciones que modifican la visualización del menú
  * al hacer scroll o al llenar el formulario en posición
  * horiontal en dispositivos móviles.
  */
 const menu = () => {
     visibilidadMenuEnFormulario();
     window.addEventListener("resize", visibilidadMenuEnFormulario);
     window.addEventListener("scroll", visualizacionMenu);
 }
 
 /**
      * @param {input} inputs
      * Elementos input del DOM en el formulario. 
      * @param {textarea} textArea 
      * Elemento textarea del DOM en el formulario.
      * @returns void.
      * @function mediaQueryCelularHorizontal() Función que devuelve un valor boleano 
      * en caso de cumplirse el media query, para valores entre min-width y max-width.
      * 
      * La condición permite validar un mediaQuery con un rango min-width y max-width.
      * Esto a fin de evitar abarcar toda la pantalla mientras el teclado en Android, iOS, etc,
      * se encuentra abierto en dispositivos móviles orientados horizontalmente.
      *
      * Eventos para @param inputs
      * focus: 
      * 
      * Cuando un campo contenga el foco, el menú se ocultará. 
      * 
      * keyup: 
      * 
      * Cuando el usuario escriba en el campo input, el menú se ocultará.
      * 
      * blur:
      * 
      * Cuando el campo pierda el foco, el menú volerá a visualizarse.
      */
 const visibilidadMenuEnFormulario = () => {
     const inputs = document.querySelectorAll("[data-campo]");
     const anchoValido = mediaQueryCelularHorizontal();
     if (anchoValido) {
         inputs.forEach((input) => {
             input.addEventListener("focus", ocultarMenu);
             input.addEventListener("keyup", ocultarMenu);
             input.addEventListener("blur", mostrarMenu);
         });
     } else {
         inputs.forEach((input) => {
             input.removeEventListener("focus", ocultarMenu);
             input.removeEventListener("keyup", ocultarMenu);
             input.removeEventListener("blur", mostrarMenu);
         });
     }
     return;
 }
 
 const visualizacionMenu = () => {
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
         ocultarMenu();
     } else if (actualScroll < scrollUltimo && body.classList.contains(scrollAbajo)) {
         mostrarMenu();
     }
     /**
      * Se asignará actualScroll a scrollUltimo
      */
     scrollUltimo = actualScroll;
 }
 /*Creditos:
 George Martsoukos
 https://webdesign.tutsplus.com/es/tutorials/how-to-hide-reveal-a-sticky-header-on-scroll-with-javascript--cms-33756
 */
 
 const mostrarMenu = () => {
     body.classList.add(scrollArriba);
     body.classList.remove(scrollAbajo);
 }
 
 const ocultarMenu = () => {
     body.classList.add(scrollAbajo);
     body.classList.remove(scrollArriba);
 }

export default menu;