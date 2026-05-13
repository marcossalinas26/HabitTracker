# Documentación Técnica: Habit Hub

Este documento explica detalladamente el funcionamiento del código de la aplicación Habit Hub, desglosando las partes más importantes línea por línea.

---

## 1. App.jsx (Corazón de la Aplicación)

`App.jsx` gestiona el estado global, la persistencia y la lógica principal.

### Importaciones y Estado
- **Líneas 1-8**: Importación de hooks de React, librería de confeti e iconos. Nota: Usamos iconos SVG directos para marcas externas (GitHub/LinkedIn) para evitar dependencias fallidas.
- **Líneas 12-15**: Inicialización del estado `habits`. Usa una función que lee de `localStorage` para que tus hábitos no se pierdan al cerrar el navegador.
- **Líneas 18-21**: Estados para el filtro (`all`, `pending`, `completed`) y el tema visual (`theme`).
- **Línea 22**: `editingHabit` guarda el hábito que se está editando para pasarlo al formulario.

### Funciones de Lógica
- **addHabit**: Genera un nuevo objeto con ID único.
- **toggleHabit**: Gestiona la lógica de completado. Incluye un sistema de rachas (`streak`) que detecta si el hábito se ha completado en días consecutivos.
- **triggerConfetti**: Lanza la animación de éxito cuando todos los hábitos están listos.

---

## 2. Componentes (Interfaz de Usuario)

### HabitForm.jsx
- **Lógica de Edición**: Detecta si hay un hábito cargado para cambiar entre modo "Crear" y "Editar".
- **Categorías**: Permite seleccionar entre Salud, Trabajo, Personal o General, aplicando colores dinámicos mediante CSS.

### HabitItem.jsx
- **Animaciones**: Usa `framer-motion` para que los hábitos aparezcan y desaparezcan con suavidad.
- **Layout**: Utiliza una estructura semántica `.habit-card` que agrupa el checkbox, el nombre y las acciones (editar/eliminar).

### StatsCard.jsx
- Recibe los datos y calcula en tiempo real los contadores para el Dashboard superior.

---

## 3. Arquitectura CSS (Borderless Glassmorphism)

Hemos diseñado un sistema de estilos propio que no depende de frameworks externos.

- **variables.css**: Aquí reside el ADN visual de la app. Si quieres cambiar el color violeta por otro, solo editas la variable `--primary`.
- **global.css**: Define el efecto de cristal (`.glass-card`). Hemos eliminado todos los bordes (`border: none`) para que la interfaz se sienta más moderna y fluida.
- **App.css**: Contiene las clases "humanas" que hacen que el código sea legible:
    - `.form-group`: Espaciado consistente en formularios.
    - `.habit-name`: Estilo tipográfico para las tareas.
    - `.footer-socials`: Estilo para los enlaces de contacto.

---

## 4. Decisiones de Diseño

1.  **Nombres de Clase Legibles**: Se han eliminado clases crípticas como `mb-3` o `px-4` para usar nombres que cualquier desarrollador pueda entender al leer el HTML.
2.  **Iconos Robustos**: Al usar SVGs directos en el footer, nos aseguramos de que los enlaces sociales siempre se vean correctamente, independientemente de las actualizaciones de librerías externas.
3.  **Variable de Progreso**: El ancho de la barra de progreso se gestiona mediante la variable CSS `--progress-width`, lo que permite animaciones más suaves gestionadas directamente por el navegador.

---

## 5. Mantenimiento

Para añadir una nueva categoría:
1. Añádela al array `categories` en `HabitForm.jsx`.
2. Añade su color correspondiente en `variables.css`.
3. Define sus estilos de color en `App.css` bajo la clase `.category-tag.[tu-categoria]`.
