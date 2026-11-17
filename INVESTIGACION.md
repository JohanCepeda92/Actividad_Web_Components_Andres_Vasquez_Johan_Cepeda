# INVESTIGACIÓN: WEB COMPONENTS, HTML TEMPLATES Y FRAMEWORKS

## PARTE 1. INVESTIGACIÓN: WEB COMPONENTS

### 1. ¿Qué problema resuelven los Web Components y qué aporta cada tecnología: Custom Elements, Shadow DOM y HTML Templates?

Los Web Components permiten crear elementos HTML personalizados y reutilizables, evitando repetir estructuras de código y facilitando el mantenimiento de las aplicaciones web. Se componen principalmente de tres tecnologías: **Custom Elements**, que permite definir nuevas etiquetas HTML y su comportamiento; **Shadow DOM**, que encapsula la estructura y los estilos internos para evitar conflictos con otros elementos de la página; y **HTML Templates**, que permite definir estructuras HTML reutilizables que pueden clonarse mediante JavaScript.

### 2. ¿En qué se diferencia un `<template>` de un `<div>` oculto con `display: none`?

Aunque ambos permiten mantener contenido que no se muestra visualmente, funcionan de manera diferente. El contenido de `<template>` permanece inactivo y no se representa en la página hasta que se utiliza mediante JavaScript. Sus elementos internos tampoco aparecen en las búsquedas normales de `document.querySelector()`, por lo que se debe acceder a ellos mediante `template.content`. En cambio, un `<div>` con `display: none` sigue formando parte del DOM, sus elementos pueden encontrarse con `document.querySelector()` y su contenido sigue las reglas normales de procesamiento del navegador.

### 3. ¿Qué cambia entre el Shadow DOM en modo "open" y en modo "closed"?

La diferencia principal está en el acceso que JavaScript externo tiene a la estructura interna del componente. Cuando se utiliza `mode: "open"`, se puede acceder al Shadow DOM mediante la propiedad `element.shadowRoot` para consultar o modificar sus elementos. En cambio, cuando se utiliza `mode: "closed"`, esta propiedad devuelve `null` y no permite acceder directamente a su contenido. Sin embargo, el modo closed no debe considerarse un mecanismo de seguridad absoluta, sino una forma de limitar el acceso externo a la estructura del componente.

### 4. ¿Qué es un `<slot>` y para qué sirve en un componente reutilizable?

Un `<slot>` es un espacio reservado dentro del Shadow DOM que permite insertar contenido proporcionado desde fuera del componente. Su función es facilitar la personalización de componentes sin modificar su estructura interna. Por ejemplo, una tarjeta de perfil puede tener un espacio para que cada usuario agregue una descripción diferente. También existen slots con nombre, que permiten distribuir el contenido en distintas secciones del componente.

### 5. ¿Qué navegadores soportan hoy los Web Components? Indica la fuente y la fecha de consulta.

Los Web Components cuentan con soporte en las versiones modernas de Google Chrome, Mozilla Firefox, Microsoft Edge y Safari. Como referencia, Custom Elements v1 tiene soporte desde Chrome 54, Firefox 63, Safari 10.1 y Edge 79. Internet Explorer no cuenta con soporte nativo para esta tecnología. Es importante considerar que cada funcionalidad tiene sus propios requisitos de compatibilidad. La información fue consultada en MDN y el estándar HTML de WHATWG el 17 de noviembre de 2026.

---

## PARTE 2. INVESTIGACIÓN: FRAMEWORKS, LIBRERÍAS Y NODE.JS

### 1. Explica con un ejemplo la diferencia entre estándar del navegador, librería, framework y entorno de ejecución.

Un **estándar del navegador** establece las reglas y funcionalidades que los navegadores implementan; por ejemplo, HTML y el elemento `<button>`. Una **librería** proporciona herramientas que el desarrollador utiliza cuando las necesita, como React para construir interfaces. Un **framework** ofrece una estructura y herramientas para desarrollar aplicaciones siguiendo una determinada organización, como Angular. Finalmente, un **entorno de ejecución** permite ejecutar código JavaScript fuera del navegador, como Node.js, que también permite desarrollar aplicaciones del lado del servidor.

### 2. Tabla comparativa: Web Components, React, Vue y Angular.

| Criterio | Web Components nativos | React | Vue | Angular |
|---|---|---|---|---|
| **Tipo (estándar, librería o framework)** | Estándar web compuesto por tecnologías nativas de los navegadores. | Librería de JavaScript para construir interfaces de usuario. | Framework progresivo de JavaScript para desarrollar interfaces. | Framework de desarrollo web mantenido por Google. |
| **Cómo se crea un componente** | Mediante una clase que extiende `HTMLElement` y se registra con `customElements.define()`. | Mediante funciones o clases que representan componentes y retornan elementos utilizando JSX. | Mediante componentes que pueden definirse en archivos `.vue`, combinando plantilla, lógica y estilos. | Mediante clases de TypeScript con el decorador `@Component`, donde se definen la plantilla y los estilos. |
| **Necesita instalar herramientas (npm)** | No necesita npm para utilizar sus funcionalidades nativas del navegador. | Generalmente se utiliza npm para instalar React y las herramientas de desarrollo, aunque también puede utilizarse mediante CDN. | Puede utilizarse mediante CDN, pero npm es habitual en proyectos con herramientas de desarrollo. | Sí, normalmente utiliza Node.js, npm y Angular CLI para crear y administrar proyectos. |
| **Ventajas principales** | No depende de un framework específico, permite reutilizar componentes y encapsular sus estilos y estructura. | Ofrece flexibilidad, componentes reutilizables y herramientas para construir interfaces dinámicas. | Tiene una curva de aprendizaje accesible, sistema reactivo y permite incorporarlo progresivamente a diferentes proyectos. | Ofrece una estructura organizada, TypeScript y herramientas integradas para desarrollar aplicaciones grandes. |
| **Desventajas principales** | Requiere desarrollar manualmente funcionalidades que otros frameworks ya proporcionan, como ciertas herramientas de gestión de estado. | Se concentra principalmente en la interfaz y puede necesitar bibliotecas adicionales para otras funcionalidades. | En proyectos grandes puede requerir integrar herramientas y bibliotecas adicionales según las necesidades. | Su aprendizaje puede ser más exigente debido a su arquitectura, herramientas y conceptos propios. |

### 3. ¿Qué es Node.js, para qué se usa y qué relación tiene npm con React, Vue y Angular? Si una tienda en línea usa React y Node.js, ¿qué hace cada uno?

Node.js es un entorno de ejecución que permite ejecutar JavaScript fuera del navegador, principalmente en servidores y herramientas de desarrollo. Se utiliza para construir aplicaciones backend, administrar solicitudes y desarrollar servicios que se comunican con bases de datos. Por otra parte, npm es un gestor de paquetes que permite instalar, administrar y compartir bibliotecas y herramientas del ecosistema JavaScript, incluidas las utilizadas por React, Vue y Angular. En una tienda en línea, React se encarga de construir la interfaz con la que interactúa el usuario, mientras que Node.js puede gestionar el servidor, las operaciones comerciales y la comunicación con la base de datos.

### 4. Elige la herramienta que usarías en cada caso y justifica.

**a. Un botón de chat que varias empresas pegan en sus propias páginas.**

Elegiría Web Components nativos porque permiten desarrollar un componente independiente que puede integrarse en páginas construidas con diferentes tecnologías. Mediante Custom Elements se puede crear una etiqueta personalizada para el botón de chat, mientras que Shadow DOM permite encapsular sus estilos y evitar conflictos con las páginas donde se instala. Además, no obliga a las empresas a utilizar React, Vue o Angular para incorporar el componente.

**b. Una aplicación web grande para un banco, con muchos equipos de desarrollo.**

Elegiría Angular porque proporciona una estructura organizada y herramientas integradas que facilitan el desarrollo de aplicaciones complejas. Su arquitectura basada en componentes, el uso de TypeScript y funcionalidades como la inyección de dependencias ayudan a mantener un código consistente. Estas características son convenientes cuando varios equipos necesitan trabajar sobre un mismo sistema y mantenerlo a largo plazo.

---

## FUENTES CONSULTADAS

**Fecha de consulta: 17 de noviembre de 2026.**

1. **MDN Web Docs. Web Components.** Documentación sobre los elementos personalizados, Shadow DOM y HTML Templates.  
   https://developer.mozilla.org/es/docs/Web/API/Web_components

2. **MDN Web Docs. `<template>`: El elemento de contenido de plantilla HTML.**  
   https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/template

3. **MDN Web Docs. ShadowRoot: mode property.** Documentación sobre los modos open y closed.  
   https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode

4. **MDN Web Docs. `<slot>`: HTML Web Components.**  
   https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot

5. **WHATWG. HTML Living Standard: Custom Elements.** Estándar oficial de HTML y referencia de compatibilidad.  
   https://html.spec.whatwg.org/multipage/custom-elements.html

6. **React. Documentación oficial.** Conceptos fundamentales y creación de componentes.  
   https://react.dev/

7. **Vue.js. Documentación oficial: Introduction.** Características y funcionamiento del framework.  
   https://vuejs.org/guide/introduction.html

8. **Angular. Documentación oficial: What is Angular?** Descripción del framework y sus herramientas.  
   https://angular.dev/overview

9. **Angular. Documentación oficial: Anatomy of Components.** Estructura y creación de componentes.  
   https://angular.dev/guide/components

10. **Node.js. Introduction to Node.js.** Descripción del entorno de ejecución JavaScript.  
    https://nodejs.org/learn/getting-started/introduction-to-nodejs

11. **npm Docs. About npm.** Descripción del gestor de paquetes y su funcionamiento.  
    https://docs.npmjs.com/about-npm/