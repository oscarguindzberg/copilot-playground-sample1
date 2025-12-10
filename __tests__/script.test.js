/** @jest-environment jsdom */

const STORAGE_KEY = 'task-manager:tasks:v1'
const FILTER_KEY = 'task-manager:filter:v1'

const buildDom = () => {
  document.body.innerHTML = `
    <main>
      <form id="add-task-form"></form>
      <input id="task-input" />
      <input id="task-desc-input" />
      <ul id="task-list"></ul>
      <div id="task-count"></div>
      <div id="empty-state"><p></p></div>
      <div id="live-region" aria-live="polite"></div>
      <button class="filter-btn" data-filter="all"></button>
      <button class="filter-btn" data-filter="active"></button>
      <button class="filter-btn" data-filter="completed"></button>
    </main>
  `
}

const loadApp = () => {
  jest.resetModules()
  localStorage.clear()
  buildDom()
  return require('../script.js')
}

describe('task app core functions', () => {
  test('addTask trims input and persists', () => {
    const app = loadApp()
    app.addTask('  Task One  ', '  desc  ')

    const tasks = app.getTasks()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].text).toBe('Task One')
    expect(tasks[0].description).toBe('desc')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(stored).toHaveLength(1)
  })

  test('addTask ignores empty or whitespace-only input', () => {
    const app = loadApp()
    app.addTask('   ', '')
    expect(app.getTasks()).toHaveLength(0)
  })

  test('toggleTask flips completion state', () => {
    const app = loadApp()
    app.resetState([{ id: 'a', text: 'Task', description: '', completed: false, createdAt: 1 }])
    app.toggleTask('a')
    expect(app.getTasks()[0].completed).toBe(true)
    app.toggleTask('a')
    expect(app.getTasks()[0].completed).toBe(false)
  })

  test('renameTask updates text when non-empty', () => {
    const app = loadApp()
    app.resetState([{ id: 'a', text: 'Old', description: '', completed: false, createdAt: 1 }])
    app.renameTask('a', 'New Name')
    expect(app.getTasks()[0].text).toBe('New Name')

    // empty rename should keep old value
    app.renameTask('a', '   ')
    expect(app.getTasks()[0].text).toBe('New Name')
  })

  test('deleteTask removes a task', () => {
    const app = loadApp()
    app.resetState([
      { id: 'a', text: 'Keep', description: '', completed: false, createdAt: 1 },
      { id: 'b', text: 'Remove', description: '', completed: false, createdAt: 2 }
    ])
    app.deleteTask('b')
    const ids = app.getTasks().map((t) => t.id)
    expect(ids).toEqual(['a'])
  })

  test('setFilter persists selected filter', () => {
    const app = loadApp()
    app.setFilter('completed')
    expect(app.getFilter()).toBe('completed')
    expect(localStorage.getItem(FILTER_KEY)).toBe('completed')
  })
})