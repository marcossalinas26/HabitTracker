# Documentación Técnica: Habit Hub

Este documento explica detalladamente el funcionamiento del código de la aplicación Habit Hub, desglosando las partes más importantes línea por línea.

---

## 1. App.jsx (Corazón de la Aplicación)

`App.jsx` gestiona el estado global, la persistencia y la lógica principal.

### Importaciones y Estado
- **Líneas 1-8**: Importación de hooks de React, librería de confeti, iconos y componentes.
- **Líneas 11-14**: Inicialización del estado `habits`. Usa una función que comprueba si hay datos en `localStorage`. Si existen, los convierte de JSON a objeto; si no, inicializa un array vacío.
- **Líneas 16-19**: Estados para el filtro (`filter`) y el tema visual (`theme`).
- **Línea 20**: `editingHabit` guarda el hábito que se está editando para pasarlo al formulario.

### Persistencia y Efectos
- **Líneas 22-24**: Guarda automáticamente los hábitos en `localStorage` cada vez que la lista cambia.
- **Líneas 26-29**: Aplica el atributo `data-theme` al `html` para cambiar entre modo claro y oscuro.

### Funciones Principales
- **Líneas 40-52**: `addHabit`: Genera un nuevo objeto hábito con un ID basado en el tiempo actual (`Date.now()`).
- **Líneas 63-95**: `toggleHabit`: Cambia el estado de completado y calcula la racha (`streak`). Si es el mismo día, no sube la racha. Si marcas el último hábito como listo, lanza el confeti.

---

## 2. HabitForm.jsx (Formulario de Entrada)

- **Línea 4-9**: Definición de las categorías disponibles con sus iconos y "slugs" para el CSS.
- **Línea 12-13**: Estados locales para el texto del input y la categoría seleccionada.
- **Línea 15-23**: `useEffect` que "escucha" si hay un hábito para editar. Si lo hay, rellena el formulario con sus datos.
- **Línea 25-36**: `handleSubmit`: Evita que la página se recargue, valida que el texto no esté vacío y decide si llamar a `addHabit` (nuevo) o `updateHabit` (edición).
- **Línea 44-50**: Input de texto vinculado al estado local `text`.
- **Línea 56-68**: Mapeo del array de categorías para crear los botones. La clase `active` se aplica dinámicamente si la categoría coincide con la seleccionada.
- **Línea 73-83**: Botón de envío que cambia su texto e icono según si estamos editando o creando.
- **Línea 84-92**: Botón de "Cancelar" (X) que solo aparece si estamos en modo edición.

---

## 3. HabitItem.jsx (Cada Fila de Hábito)

- **Línea 4-9**: Configuración local para mapear la categoría del hábito con su icono y clase CSS.
- **Línea 15-21**: Uso de `motion.div` de Framer Motion. Define la animación de entrada (desplazamiento desde la izquierda) y el layout automático.
- **Línea 23-28**: Checkbox personalizado. Al cambiar, llama a `toggleHabit` del padre.
- **Línea 31-33**: Badge de la categoría. Usa el `config.slug` para aplicar los colores correctos desde el CSS.
- **Línea 34-39**: Badge de racha. Solo se renderiza si `habit.streak` es mayor que cero.
- **Línea 41-43**: Texto del hábito. Aplica la clase `.completed` (tachado) si el hábito está marcado como listo.
- **Línea 48-62**: Botones de acción. El de edición (`Edit2`) carga el hábito en el estado global, y el de eliminación (`Trash2`) lo borra.

---

## 4. StatsCard.jsx (Panel de Estadísticas)

- **Línea 4-5**: Desestructuración de las props para obtener la lista de hábitos y el contador de completados.
- **Línea 8-11**: Renderizado de 3 tarjetas (`Total`, `Listos`, `Faltan`) usando la clase semántica `.stat-card` y los iconos de Lucide.

---

## 5. Arquitectura CSS Profesional

- **variables.css**: Contiene los "Design Tokens" (colores de categorías, colores de marca, sombras).
- **layout.css**: Reemplaza a Bootstrap con un sistema de Grid y Flexbox propio y ligero.
- **App.css**: Contiene las clases "humanas" como `.habit-card` o `.form-group`, haciendo que el JSX sea mucho más limpio y fácil de leer.
