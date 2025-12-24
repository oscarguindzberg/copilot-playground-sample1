# Gestor de Tareas (Accesible y Responsive)

Esta es una aplicación web simple y accesible de gestión de tareas con las siguientes características (ahora usando una paleta de colores clara):

- Agregar tareas
- Marcar tareas como completadas
- Eliminar tareas
- Persistencia en LocalStorage
- Atajos de teclado + actualizaciones en vivo accesibles
- Diseño responsive y estilo moderno
 - Filtrado: mostrar Todas / Activas / Completadas
 - Tema: Claro (predeterminado). La interfaz usa una paleta de colores clara para mejorar la legibilidad en entornos luminosos.

## Archivos

- `index.html` — marcado semántico y estructura
- `styles.css` — estilos CSS modernos y responsivos
- `script.js` — lógica de la aplicación, persistencia y comportamientos de accesibilidad

## Ejecutar localmente

Abre `index.html` en un navegador. No se requiere servidor. Para desarrollo, también puedes servirlo con un servidor estático simple; por ejemplo, usando Python:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000 en tu navegador
```

## Accesibilidad y Atajos de teclado

- Se incluyen etiquetas apropiadas y estados de foco.
- Una región `aria-live` anuncia cambios (tarea agregada, completada, eliminada).
- Presiona `N` o `/` para enfocar rápidamente el campo de entrada de Agregar Tarea.
- Usa `Tab` y `Shift+Tab` para navegar entre elementos interactivos. Usa Enter/Espacio para activar botones.
- Presiona `Enter` o `Espacio` en la etiqueta de una tarea para alternar su completado (también se puede usar la casilla de verificación).
- Los botones de filtro (Todas / Activas / Completadas) son accesibles con el teclado y se pueden activar mediante teclado.

## Notas

- Las tareas persisten en `localStorage` usando la clave `task-manager:tasks:v1`.
- El filtro seleccionado persiste usando `task-manager:filter:v1`.
- Es simple por diseño — siéntete libre de expandir características como editar tareas, ordenar, filtrar o importar/exportar datos.

## Licencia

Open-source y de uso libre.

## Autor
Creado por Oscar.

## Agradecimientos
Inspirado en varias aplicaciones de gestión de tareas y mejores prácticas de accesibilidad.
