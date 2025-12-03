# Gestor de Tareas (Accesible y Responsivo)

Este es un gestor de tareas web simple y accesible con las siguientes características (ahora usando una paleta de colores claros):

- Añadir tareas
- Marcar tareas como completadas
- Eliminar tareas
- Persistencia en LocalStorage
- Atajos de teclado + actualizaciones en vivo accesibles
- Diseño responsivo y estilos modernos
 - Filtrado: mostrar Todas / Activas / Completadas
 - Tema: Claro (por defecto). La interfaz usa una paleta de colores claros para mejorar la legibilidad en ambientes luminosos.

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

## Accesibilidad y atajos de teclado

- Se incluyen etiquetas apropiadas y estados de enfoque.
- Una región `aria-live` anuncia los cambios (tarea añadida, completada, eliminada).
- Presiona `N` o `/` para enfocar rápidamente el campo de entrada de nueva tarea.
- Usa `Tab` y `Shift+Tab` para navegar entre elementos interactivos.
- Presiona `Enter` o `Espacio` en la etiqueta de una tarea para alternar su estado (también se puede usar la casilla de verificación).
 - Presiona `N` o `/` para enfocar rápidamente el campo de entrada de nueva tarea.
 - Usa `Tab` y `Shift+Tab` para navegar entre elementos interactivos. Usa Enter/Espacio para activar botones.
 - Los botones de filtro (Todas / Activas / Completadas) son navegables con teclado y soportan activación por teclado.

## Notas

- Las tareas se persisten en `localStorage` usando la clave `task-manager:tasks:v1`.
 - Las tareas se persisten en `localStorage` usando la clave `task-manager:tasks:v1`.
 - El filtro seleccionado se persiste usando `task-manager:filter:v1`.
- Es simple por diseño—siéntete libre de expandir características como editar tareas, ordenar, filtrar o importar/exportar datos.

## Licencia

Código abierto y de uso libre.

## Autor
Creado por Oscar.

## Agradecimientos
Inspirado en varias aplicaciones de gestión de tareas y mejores prácticas de accesibilidad.