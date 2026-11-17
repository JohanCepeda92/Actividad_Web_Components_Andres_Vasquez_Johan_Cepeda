# Actividad evaluativa: Web Components, HTML Templates y frameworks

## Integrantes

| Integrante | Parte a cargo |
|---|---|
| Andrés Vásquez | Parte 3 · Práctica (`index.html` y `js/main.js`) |
| Johan Cepeda | Partes 1 y 2 · Investigación (`INVESTIGACION.md`) |

## Caso elegido: Ficha de mascota para una veterinaria

Creamos el componente `<ficha-mascota>` para la "Veterinaria Patitas". Cada ficha muestra:

- **Nombre**, **especie** y **edad** de la mascota.
- **Fecha de la próxima vacuna**, con una etiqueta de color que se calcula comparándola con la fecha de hoy:
  - 🟢 **Vacunas al día**: faltan más de 30 días.
  - 🟡 **Vacuna en X días**: faltan 30 días o menos.
  - 🔴 **Vacuna vencida**: la fecha ya pasó.
- Una **nota del veterinario** escrita libremente dentro del componente, que entra por un `<slot>`.

> Como la etiqueta depende del día en que se abre la página, los colores pueden cambiar con el tiempo. Así funciona un control de vacunas real.

## Estructura del repositorio

```
├── README.md          → este archivo
├── INVESTIGACION.md   → Partes 1 y 2 de la investigación
├── index.html         → el <template> y las 4 instancias del componente
└── js/
    └── main.js        → la clase FichaMascota, comentada por requisito (R1 … R5)
```

## Cómo probar el componente

1. Clona el repositorio o descárgalo como ZIP.
2. Abre `index.html` en el navegador con doble clic (o con la extensión Live Server de VS Code).
   No hace falta instalar nada: no usamos npm ni librerías.
3. Deberías ver 4 fichas: Luna, Michi, Copito y Kiwi. Kiwi no tiene nota, así que muestra el texto por defecto del slot.
4. **Prueba extra en la consola del navegador (F12 → Console):**

   Cambiar un atributo de una ficha que ya existe (se actualiza sola):

   ```js
   document.querySelector('ficha-mascota').setAttribute('nombre', 'Max');
   ```

   Crear una ficha nueva desde JavaScript:

   ```js
   const nueva = document.createElement('ficha-mascota');
   nueva.setAttribute('nombre', 'Toby');
   nueva.setAttribute('especie', 'tortuga');
   nueva.setAttribute('edad', '10');
   nueva.setAttribute('proxima-vacuna', '2027-02-01');
   nueva.innerHTML = '<p slot="nota">Revisar el caparazón.</p>';
   document.querySelector('.fichas').append(nueva);
   ```

   Comprobar el encapsulamiento del Shadow DOM: esto devuelve `null`, porque el contenido de las fichas no es visible para `document.querySelector`:

   ```js
   document.querySelector('.nombre');
   ```

### Uso del componente

```html
<ficha-mascota nombre="Luna" especie="perro" edad="3" proxima-vacuna="2026-11-10">
  <p slot="nota">Alergia al pollo.</p>
</ficha-mascota>
```

| Atributo | Ejemplo | Qué muestra |
|---|---|---|
| `nombre` | `Luna` | Nombre de la mascota |
| `especie` | `perro` | Especie e ícono (perro, gato, conejo, ave, hámster, tortuga; otra especie usa 🐾) |
| `edad` | `3` | Edad en años ("1 año" / "3 años") |
| `proxima-vacuna` | `2026-11-10` | Fecha en formato `AAAA-MM-DD`; con ella se calcula el estado |
| `slot="nota"` | `<p slot="nota">…</p>` | Nota libre del veterinario |

## Cómo cumplimos cada requisito

| Requisito | Dónde está | Cómo se cumple |
|---|---|---|
| **R1 · Template propio** | `index.html` → `<template id="tpl-ficha-mascota">` | El template tiene su propio `<style>` y marcadores vacíos (`.nombre`, `.especie`, `.icono`, `.edad`, `.vacuna`, `.estado`) que `render()` rellena desde JavaScript. |
| **R2 · Componente** | `js/main.js` → `class FichaMascota extends HTMLElement` | Se registra con `customElements.define('ficha-mascota', …)`; el nombre lleva guion. En el constructor se crea el Shadow DOM (`attachShadow`) y se clona el template con `template.content.cloneNode(true)`. |
| **R3 · Atributos** | `observedAttributes`, `attributeChangedCallback` y `render()` | Recibe 4 atributos (`nombre`, `especie`, `edad`, `proxima-vacuna`). Si uno cambia, la ficha se vuelve a pintar. Usamos `textContent` y no `innerHTML` para que un atributo no pueda inyectar HTML. |
| **R4 · Slot** | `<slot name="nota">` dentro del template | Cada ficha recibe su nota con `<p slot="nota">`. Si no hay nota, se ve el texto por defecto "Sin observaciones registradas". |
| **R5 · Reutilización** | `index.html` → `<main class="fichas">` | La página muestra 4 instancias con datos distintos, y cada una cae en un estado de vacuna diferente. |

Otros detalles:

- El script se carga en el `<head>` con `defer`, así se ejecuta cuando el HTML ya está leído y el `<template>` ya existe.
- La fecha `AAAA-MM-DD` se convierte a mano en fecha local, porque `new Date("2026-12-01")` la toma en UTC y en Colombia se mostraría un día antes.
- `ficha-mascota:not(:defined) { visibility: hidden; }` oculta las fichas durante el instante en que el componente aún no está registrado, para que no se vea la nota sin estilos.

## Declaración de uso de IA

- **Parte práctica (Andrés):** usamos Claude (Anthropic) como apoyo para estructurar el componente, revisar los requisitos R1–R5 y proponer los estilos. Revisamos el código línea por línea, lo probamos en el navegador y podemos explicar cada parte: por qué el `<template>` no se muestra, cómo se clona en el Shadow DOM, cómo funcionan `observedAttributes` y `attributeChangedCallback`, y cómo el `<slot>` recibe la nota.
- **Investigación (Johan):** _pendiente de completar por Johan._
