// Task Manager script
(function () {
  'use strict'

  const STORAGE_KEY = 'task-manager:tasks:v1'
  const FILTER_KEY = 'task-manager:filter:v1'
  const SORT_KEY = 'task-manager:sort:v1'

  // DOM elements
  const form = document.getElementById('add-task-form')
  const input = document.getElementById('task-input')
  const list = document.getElementById('task-list')
  const countEl = document.getElementById('task-count')
  const emptyState = document.getElementById('empty-state')
  const liveRegion = document.getElementById('live-region')

  let tasks = []
  let currentFilter = 'all'
  let currentSort = 'newest'

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

  // Sort tasks based on current sort option
  function sortTasks(tasksToSort) {
    const sorted = [...tasksToSort]
    switch (currentSort) {
      case 'newest':
        return sorted.sort((a, b) => b.createdAt - a.createdAt)
      case 'oldest':
        return sorted.sort((a, b) => a.createdAt - b.createdAt)
      case 'alphabetical':
        return sorted.sort((a, b) => a.text.localeCompare(b.text))
      case 'reverse-alphabetical':
        return sorted.sort((a, b) => b.text.localeCompare(a.text))
      default:
        return sorted
    }
  }

  // Render tasks list
  function render() {
    list.innerHTML = ''
    const total = tasks.length
    const activeCount = tasks.reduce((acc, t) => acc + (!t.completed ? 1 : 0), 0)
    const completedCount = total - activeCount

    const filtered = tasks.filter((t) => {
      if (currentFilter === 'all') return true
      if (currentFilter === 'active') return !t.completed
      if (currentFilter === 'completed') return t.completed
      return true
    })

    const visible = sortTasks(filtered)

    if (!visible || visible.length === 0) {
      emptyState.hidden = false
      if (total === 0) {
        countEl.textContent = '0 tasks'
        emptyState.querySelector('p').textContent = 'No tasks yet — add one above to get started.'
      } else {
        // tasks exist but none for this filter
        countEl.textContent = `${visible.length} ${visible.length === 1 ? 'task' : 'tasks'} (${activeCount} open, ${completedCount} completed)`
        emptyState.querySelector('p').textContent = 'No tasks in this filter.'
      }
      return
    }

    emptyState.hidden = true
    countEl.textContent = `${visible.length} ${visible.length === 1 ? 'task' : 'tasks'} (${activeCount} open, ${completedCount} completed)`

    visible.forEach((task) => {
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

      const edit = document.createElement('button')
      edit.className = 'edit-btn'
      edit.type = 'button'
      edit.textContent = 'Rename'
      edit.title = `Rename ${task.text}`
      edit.setAttribute('aria-label', `Rename task ${task.text}`)
      edit.addEventListener('click', () => startEditTask(task.id))

      const del = document.createElement('button')
      del.className = 'delete-btn'
      del.type = 'button'
      del.textContent = 'Delete'
      del.title = `Delete ${task.text}`
      del.setAttribute('aria-label', `Delete task ${task.text}`)
      del.addEventListener('click', () => deleteTask(task.id))

      actions.appendChild(edit)
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

  // Start editing a task
  function startEditTask(id) {
    const li = list.querySelector(`li[data-id="${id}"]`)
    if (!li) return
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    const label = li.querySelector('.task-label')
    const left = li.querySelector('.task-left')
    if (!label || !left) return

    // Prevent multiple editors
    if (left.querySelector('.edit-input')) return

    const inputEdit = document.createElement('input')
    inputEdit.type = 'text'
    inputEdit.className = 'edit-input'
    inputEdit.value = t.text
    inputEdit.setAttribute('aria-label', `Rename task ${t.text}`)

    // Replace label with input temporarily
    left.replaceChild(inputEdit, label)
    inputEdit.focus()
    inputEdit.select()

    const finish = (commit) => {
      const newText = inputEdit.value.trim()
      // restore label
      label.textContent = commit && newText ? newText : t.text
      left.replaceChild(label, inputEdit)
      if (commit && newText && newText !== t.text) {
        renameTask(id, newText)
      }
    }

    inputEdit.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        finish(true)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        finish(false)
      }
    })
    inputEdit.addEventListener('blur', () => finish(true))
  }

  // Rename and persist
  function renameTask(id, newText) {
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    const trimmed = newText.trim()
    if (!trimmed) return
    const old = t.text
    t.text = trimmed
    save()
    render()
    announce(`Renamed task: ${old} to ${trimmed}`)
  }

  // Delete a task
  function deleteTask(id) {
    const taskIndex = tasks.findIndex((x) => x.id === id)
    if (taskIndex === -1) return
    const task = tasks.splice(taskIndex, 1)[0]
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
    currentFilter = localStorage.getItem(FILTER_KEY) || 'all'
    currentSort = localStorage.getItem(SORT_KEY) || 'newest'

    // wire filter buttons
    const btns = document.querySelectorAll('.filter-btn')
    btns.forEach((b) => {
      b.addEventListener('click', (e) => {
        const which = e.currentTarget.dataset.filter
        setFilter(which)
      })
    })
    setFilter(currentFilter)

    // wire sort select
    const sortSelect = document.getElementById('sort-select')
    if (sortSelect) {
      sortSelect.value = currentSort
      sortSelect.addEventListener('change', (e) => {
        setSort(e.target.value)
      })
    }
  }

  function setFilter(filter) {
    currentFilter = filter || 'all'
    localStorage.setItem(FILTER_KEY, currentFilter)
    // update pressed state
    const btns = document.querySelectorAll('.filter-btn')
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === currentFilter))
    announce(`Showing ${currentFilter === 'all' ? 'all tasks' : currentFilter === 'active' ? 'active tasks' : 'completed tasks'}`)
    render()
  }

  function setSort(sort) {
    currentSort = sort || 'newest'
    localStorage.setItem(SORT_KEY, currentSort)
    const sortNames = {
      'newest': 'newest first',
      'oldest': 'oldest first',
      'alphabetical': 'A to Z',
      'reverse-alphabetical': 'Z to A'
    }
    announce(`Sorting by ${sortNames[currentSort] || currentSort}`)
    render()
  }

  init()
})()
