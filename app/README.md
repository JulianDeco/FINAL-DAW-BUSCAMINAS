# Estructura de la carpeta `app`

Esta carpeta contiene todo el código fuente y los recursos del juego **Buscaminas**. A continuación se detallan los archivos y carpetas:

## 📂 Estructura

```
app/
├── index.html # Página principal del juego
├── img/ # Carpeta de imágenes usadas en el juego
├── js/ # Archivos JavaScript con la lógica del juego
├── styles/ # Archivos CSS para los estilos y diseño
```

---

## 📄 Descripción de los archivos

- **index.html**  
  Contiene la estructura HTML5 del juego. Aquí se renderiza el tablero, el cronómetro, los botones y modales.

- **img/**  
  Carpeta donde se almacenan los recursos gráficos, como:
  - Iconos de banderas
  - Imágenes de minas
  - Otros elementos visuales necesarios

- **js/**  
  Carpeta con los scripts en JavaScript (ES5). Incluye:
  - `main.js`: lógica principal del juego
  - Otros scripts organizados si se divide el código por funcionalidades (ej: manejo del DOM, utilidades, validaciones)

- **styles/**  
  Archivos de estilos CSS3. Incluye:
  - `style.css`: diseño general, uso de Flexbox, responsividad, modo oscuro (si se implementa)
  - Posibles archivos adicionales para dividir los estilos por componentes

---

## 📌 Notas adicionales

- Todos los nombres de archivos y carpetas siguen la convención **kebab-case** para mantener consistencia.
- El código es estricto, sin ES6, siguiendo las reglas solicitadas para el proyecto (HTML5, CSS3, JS ES5).
- No se utilizan estilos ni scripts en línea, todo está modularizado.

