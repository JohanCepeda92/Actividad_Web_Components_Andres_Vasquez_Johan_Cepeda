/*
 * Ficha de mascota · Veterinaria Patitas
 * Web Component nativo, sin librerías: Custom Element + Shadow DOM + <template>.
 */

// Ícono según la especie. Si la especie no está en la lista se usa una huella.
const ICONOS_ESPECIE = {
  perro: '🐶',
  gato: '🐱',
  conejo: '🐰',
  ave: '🐦',
  hamster: '🐹',
  'hámster': '🐹',
  tortuga: '🐢',
};

// Cuántos días antes de la vacuna la ficha pasa a estado "próxima".
const DIAS_AVISO = 30;

// Convierte "AAAA-MM-DD" en una fecha local.
// Se hace a mano porque new Date("2026-12-01") la interpreta en UTC
// y en Colombia (UTC-5) se mostraría un día antes.
function leerFecha(texto) {
  const [anio, mes, dia] = texto.split('-').map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

// Compara la fecha de la vacuna con el día de hoy y devuelve el estado.
function estadoVacuna(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const dias = Math.round((fecha - hoy) / (1000 * 60 * 60 * 24));

  if (dias < 0) return { clase: 'vencida', texto: 'Vacuna vencida' };
  if (dias === 0) return { clase: 'proxima', texto: 'Vacuna hoy' };
  if (dias <= DIAS_AVISO) {
    return { clase: 'proxima', texto: `Vacuna en ${dias} ${dias === 1 ? 'día' : 'días'}` };
  }
  return { clase: 'al-dia', texto: 'Vacunas al día' };
}

// R2 · Componente: clase que extiende HTMLElement
class FichaMascota extends HTMLElement {
  // R3 · Atributos: lista de atributos que el componente vigila
  static get observedAttributes() {
    return ['nombre', 'especie', 'edad', 'proxima-vacuna'];
  }

  constructor() {
    super();

    // R2 · Se crea el Shadow DOM (modo "open") para aislar el HTML y el CSS de la ficha
    const shadow = this.attachShadow({ mode: 'open' });

    // R1 · Se busca el <template> propio que está en index.html...
    const template = document.getElementById('tpl-ficha-mascota');

    // R2 · ...y se clona su contenido (con su <style>) dentro del Shadow DOM.
    // cloneNode(true) copia todo el árbol, así cada ficha tiene su propia copia.
    shadow.appendChild(template.content.cloneNode(true));

    // R4 · Slot: no necesita JavaScript. El navegador pone automáticamente
    // el elemento con slot="nota" dentro del <slot name="nota"> del template.
  }

  // Se ejecuta cuando la ficha se inserta en la página
  connectedCallback() {
    this.render();
  }

  // R3 · Si un atributo cambia (por ejemplo con setAttribute), la ficha se actualiza sola
  attributeChangedCallback(nombreAtributo, valorAnterior, valorNuevo) {
    if (valorAnterior !== valorNuevo) this.render();
  }

  // R1 · Rellena los marcadores vacíos del template con los datos de los atributos
  render() {
    const buscar = (selector) => this.shadowRoot.querySelector(selector);

    // R3 · Lectura de los atributos, con un valor por defecto si alguno falta
    const nombre = this.getAttribute('nombre') || 'Sin nombre';
    const especie = this.getAttribute('especie') || 'especie sin registrar';
    const edad = this.getAttribute('edad');
    const fecha = leerFecha(this.getAttribute('proxima-vacuna') || '');

    // R3 · Se muestran los datos en el template.
    // Se usa textContent (no innerHTML) para que un atributo no pueda meter HTML en la página.
    buscar('.nombre').textContent = nombre;
    buscar('.especie').textContent = especie;
    buscar('.icono').textContent = ICONOS_ESPECIE[especie.toLowerCase()] || '🐾';
    buscar('.edad').textContent = edad ? `${edad} ${edad === '1' ? 'año' : 'años'}` : 'Sin dato';

    const ficha = buscar('.ficha');
    const etiquetaEstado = buscar('.estado');

    if (fecha) {
      buscar('.vacuna').textContent = fecha.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const estado = estadoVacuna(fecha);
      ficha.dataset.estado = estado.clase; // el CSS del template usa este dato para el color
      etiquetaEstado.textContent = estado.texto;
    } else {
      buscar('.vacuna').textContent = 'Sin programar';
      ficha.dataset.estado = 'sin-fecha';
      etiquetaEstado.textContent = 'Sin vacuna programada';
    }
  }
}

// R2 · Registro del componente. El nombre lleva guion, como exige el estándar.
customElements.define('ficha-mascota', FichaMascota);

// R5 · Reutilización: esta única clase da vida a todas las <ficha-mascota> de index.html.
// Cada instancia tiene su propio Shadow DOM, sus propios atributos y su propia nota.
