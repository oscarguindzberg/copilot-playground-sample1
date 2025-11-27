// Task Manager script
(function () {
  'use strict'

  const STORAGE_KEY = 'task-manager:tasks:v1'

  // DOM elements
  const form = document.getElementById('add-task-form')
  const input = document.getElementById('task-input')
  const list = document.getElementById('task-list')
  const countEl = document.getElementById('task-count')
  const emptyState = document.getElementById('empty-state')
  const liveRegion = document.getElementById('live-region')

  let tasks = []

  // Utilities
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const announce = (msg) => {
    if (!liveRegion) return
    liveRegion.textContent = ''
    // small timeout helps some AT announce changes
    setTimeout(() => (liveRegion.textContent = msg), 10)
  }

  // Render tasks list
  function render() {
    list.innerHTML = ''
    if (!tasks || tasks.length === 0) {
      emptyState.hidden = false
      countEl.textContent = '0 tasks'
      return
    }

    emptyState.hidden = true
    countEl.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`

    tasks.forEach((task) => {
      const li = document.createElement('li')
      li.className = 'task-item'
      if (task.completed) li.classList.add('completed')
      li.dataset.id = task.id

      const left = document.createElement('div')
      left.className = 'task-left'

      const checkboxLabel = document.createElement('label')
      checkboxLabel.className = 'task-checkbox'

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = !!task.completed
      checkbox.id = `chk-${task.id}`
      checkbox.setAttribute('aria-label', `Mark ${task.text} as completed`)
      checkbox.addEventListener('change', () => toggleTask(task.id))
      checkboxLabel.appendChild(checkbox)

      const label = document.createElement('span')
      label.className = 'task-label'
      label.textContent = task.text
      label.setAttribute('tabindex', '0')
      label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleTask(task.id)
        }
      })
      if (task.completed) label.classList.add('completed')

      left.appendChild(checkboxLabel)
      left.appendChild(label)

      const actions = document.createElement('div')
      actions.className = 'task-actions'

      const del = document.createElement('button')
      del.className = 'delete-btn'
      del.type = 'button'
      del.textContent = 'Delete'
      del.title = `Delete ${task.text}`
      del.setAttribute('aria-label', `Delete task ${task.text}`)
      del.addEventListener('click', () => deleteTask(task.id))

      actions.appendChild(del)

      li.appendChild(left)
      li.appendChild(actions)
      list.appendChild(li)
    })
  }

  // Add a new task
  function addTask(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const task = { id: uid(), text: trimmed, completed: false, createdAt: Date.now() }
    tasks.unshift(task)
    save()
    render()
    announce(`Added task: ${trimmed}`)
  }

  // Toggle a task
  function toggleTask(id) {
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    t.completed = !t.completed
    save()
    render()
    announce(`${t.text} ${t.completed ? 'completed' : 'marked as incomplete'}`)
  }

  // Delete a task
  function deleteTask(id) {
    const i = tasks.findIndex((x) => x.id === id)
    if (i === -1) return
    const task = tasks.splice(i, 1)[0]
    save()
    render()
    announce(`Deleted task: ${task.text}`)
  }

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!input.value.trim()) return
    addTask(input.value)
    input.value = ''
    input.focus()
  })

  // Keyboard shortcuts: N to focus add input, / to focus input
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return // skip typing
    if (e.key === 'n' || e.key === 'N' || e.key === '/') {
      e.preventDefault()
      input.focus()
    }
  })

  // Initialize
  function init() {
    tasks = load() || []
    render()
  }

  init()
})()
