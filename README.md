# Task Manager (Accessible & Responsive)

This is a simple, accessible task manager web app with the following features (now using a light color palette):

- Add tasks
- Mark tasks complete
- Delete tasks
- LocalStorage persistence
- Keyboard shortcuts + accessible live updates
- Responsive layout and modern styling
- Filtering: show All / Active / Completed tasks
- Sorting: sort by newest, oldest, alphabetical (A-Z), or reverse alphabetical (Z-A)
- Theme: Light (default). The UI uses a clean light color palette for improved readability in bright environments.

## Files

- `index.html` — semantic markup and structure
- `styles.css` — modern, responsive CSS styles
- `script.js` — app logic, persistence, and accessibility behaviors

## Run locally

Open `index.html` in a browser. No server required. For development, you can also serve it with a simple static server; for example, using Python:

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Accessibility & Keyboard shortcuts

- Proper labels and focus states are included.
- A `aria-live` region announces changes (task added, completed, deleted).
- Press `N` or `/` to focus the Add Task input quickly.
- Use `Tab` and `Shift+Tab` to navigate interactive elements.
- Press `Enter` or `Space` on a task's label to toggle completion (checkbox can also be used).
 - Press `N` or `/` to focus the Add Task input quickly.
 - Use `Tab` and `Shift+Tab` to navigate interactive elements. Use Enter/Space to activate buttons.
 - The filter buttons (All / Active / Completed) are keyboard-focusable and support activation by keyboard.

## Notes

- Tasks persist to `localStorage` using the key `task-manager:tasks:v1`.
- The selected filter persists using `task-manager:filter:v1`.
- The selected sort order persists using `task-manager:sort:v1`.
- It's simple by design—feel free to expand features like editing tasks, importing/exporting data, or adding due dates.

## License

Open-source and free to use.

## Author
Created by Oscar.

## Acknowledgments
Inspired by various task manager apps and accessibility best practices.