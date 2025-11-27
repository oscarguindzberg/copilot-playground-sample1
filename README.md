# Task Manager (Accessible & Responsive)

This is a simple, accessible task manager web app with the following features:

- Add tasks
- Mark tasks complete
- Delete tasks
- LocalStorage persistence
- Keyboard shortcuts + accessible live updates
- Responsive layout and modern styling

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

## Notes

- Tasks persist to `localStorage` using the key `task-manager:tasks:v1`.
- It's simple by design—feel free to expand features like editing tasks, sorting, filtering, or importing/exporting data.

## License

Open-source and free to use.
