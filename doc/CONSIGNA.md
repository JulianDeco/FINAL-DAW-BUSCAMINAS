# Proyecto Final - Desarrollo y Arquitecturas Web 2025

## Minesweeper (Buscaminas)

**Link de interés:** [https://minesweeper.online/es/](https://minesweeper.online/es/)

---

## Reglas del Juego

- El tablero está dividido en celdas, con minas distribuidas al azar.
- Para ganar debes abrir todas las celdas que no contienen minas.
- Al hacer clic en una celda sin mina, se revela un número indicando cuántas minas vecinas hay.
- Las celdas sospechosas pueden marcarse con una bandera (clic derecho).
- Se puede iniciar una nueva partida haciendo clic en la cara feliz o presionando la barra espaciadora.
- El número de minas restantes se muestra a la izquierda y el cronómetro a la derecha.

### Chording

- Cuando un número tiene la cantidad correcta de banderas, puedes hacer clic en él para abrir todas las celdas vecinas.
- Esta técnica, llamada "chording", agiliza el juego y se puede configurar.

---

## Requerimientos Obligatorios

- Código prolijo y estricto (HTML5, CSS3, ES5).
- Consistencia en comentarios, commits y estilos de código.
- Responsividad y estética del juego usando Flexbox.
- No utilizar `alert` bloqueantes, reemplazarlos por modales.
- Juego completamente funcional para un jugador:
  - Debe ingresar su nombre al iniciar la partida (mínimo 3 letras).
  - Tablero generado dinámicamente con JavaScript.
  - Tablero por defecto: 8x8 y 10 minas.
  - Minas ubicadas aleatoriamente al iniciar.
  - Controles:
    - Clic izquierdo: Revelar celda.
    - Clic derecho: Colocar/quitar bandera.
- Perder al revelar una mina.
- Ganar al revelar todas las celdas sin minas.
- Expansión automática de celdas vacías sin minas vecinas.
- Mostrar:
  - Contador de minas restantes (banderas - minas).
  - Temporizador desde el primer clic hasta finalizar.
  - Mensaje al ganar o perder.
- Opción para reiniciar partida sin recargar.
- Validaciones:
  - Evitar configuraciones imposibles (ejemplo: más minas que celdas).
- Página de Contacto:
  - Formulario con Nombre, Email y Mensaje.
  - Validaciones con JavaScript:
    - Nombre alfanumérico.
    - Email válido.
    - Mensaje de al menos 5 caracteres.
  - Al enviar, abrir herramienta de correo predeterminada.
- Link al repositorio de GitHub en nueva pestaña.

---

## Requerimientos Deseados (Opcionales para nota máxima)

- Modo claro/oscuro (accesibilidad).
- Sonido al revelar bombas o ganar.
- Guardar historial de partidas en LocalStorage:
  - Nombre, puntaje, fecha, hora y duración.
- Modal con ranking ordenado por puntaje.
- Opción de ordenar ranking por fecha o puntaje.
- Niveles de dificultad:
  - Fácil: 8x8 - 10 minas.
  - Medio: 12x12 - 25 minas.
  - Difícil: 16x16 - 40 minas.

---

## Condiciones de Entrega

### Buenas prácticas de Git/GitHub

- Commits detallados y descriptivos, reflejando el progreso.
- Commits cortos, claros, sin términos genéricos como "Fixes".
- README claro y bien formateado.
- Estructura de carpetas organizada:
  - Imágenes, CSS y JS en carpetas separadas.
  - Uso coherente de nomenclatura (`CamelCase` o `kebab-case`).
- `.gitignore` para excluir archivos innecesarios.

---

## Estándares de Código

### HTML

- Siempre definir:
  - `<!DOCTYPE html>`
  - `<meta charset>`
  - `<meta viewport>`
  - `<title>`
- Usar archivo CSS de normalización (ej: `reset.css`).
- No usar `<br>` innecesarios (usar CSS).
- Scripts al final de `<body>` o con `onLoad`.
- Evitar estilos y JavaScript en línea.
- Consistencia en nombres (`CamelCase` o `kebab-case`).
- Indentación perfecta, sin mezclar espacios y tabs.
- Código limpio, sin comentarios innecesarios.

### CSS

- Solo Flexbox, prohibido Grid y float.
- Consistencia en estilos de color (hex, rgb o nombres).
- Consistencia en unidades (px, rem, %, etc).
- Orden de selectores:
  - Elementos
  - Pseudo-elementos
  - Clases
  - IDs
- Media queries siempre al final.
- Orden de propiedades:
  - `display`, `position`
  - Propiedades de Flex (si aplica)
  - Box Model (margen, padding, borde)
  - Fondo y colores
  - Texto y tipografía
  - Resto de propiedades
- Código limpio, sin líneas en blanco ni comentarios sobrantes.

### JavaScript

- Siempre `"use strict"` al inicio.
- Solo sintaxis ES5:
  - Evitar `let`, `const`, `()=>`.
- Consistencia en comillas (simples o dobles, no mezclar).
- Uso consistente o nulo de `;`.
- Comparaciones estrictas: `===` y `!==`.
- Declarar variables globales al inicio, locales al inicio de cada función.
- Eventos con `addEventListener`.
- Evitar callbacks anónimos, declarar funciones aparte.
- Orden lógico de funciones (lo que se llama, declarado antes).
- Código modular, separar funciones en archivos si es necesario.
- Evitar inyección de HTML, preferir tener el HTML oculto y mostrarlo con clases.
- Indentación perfecta, sin líneas vacías ni comentarios innecesarios.

---

## General

- Consistencia de idioma en el código (todo en español o todo en inglés).

---
