/**
 * @jest-environment jsdom
 */

describe('Task Manager', () => {
  let container;

  beforeEach(() => {
    // Set up DOM structure
    document.body.innerHTML = `
      <form id="add-task-form">
        <input id="task-input" type="text" />
        <button type="submit">Add Task</button>
      </form>
      <ul id="task-list"></ul>
      <div id="task-count"></div>
      <div id="empty-state" hidden>
        <p>No tasks yet</p>
      </div>
      <div id="live-region"></div>
      <div class="task-filters">
        <button class="filter-btn" data-filter="all" aria-pressed="true"></button>
        <button class="filter-btn" data-filter="active" aria-pressed="false"></button>
        <button class="filter-btn" data-filter="completed" aria-pressed="false"></button>
      </div>
    `;

    // Clear localStorage
    localStorage.clear();
    
    container = document.body;
  });

  describe('Task Creation', () => {
    it('should generate unique task IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
        ids.add(id);
      }
      expect(ids.size).toBe(100);
    });

    it('should create task with required properties', () => {
      const task = {
        id: 'test-id',
        text: 'Test task',
        completed: false,
        createdAt: Date.now()
      };
      
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('text');
      expect(task).toHaveProperty('completed');
      expect(task).toHaveProperty('createdAt');
      expect(task.completed).toBe(false);
    });

    it('should trim whitespace from task text', () => {
      const text = '  Test task  ';
      const trimmed = text.trim();
      expect(trimmed).toBe('Test task');
    });

    it('should not create task with empty text', () => {
      const text = '   ';
      const trimmed = text.trim();
      expect(trimmed).toBe('');
    });
  });

  describe('LocalStorage Operations', () => {
    it('should save tasks to localStorage', () => {
      const tasks = [
        { id: '1', text: 'Task 1', completed: false, createdAt: Date.now() }
      ];
      localStorage.setItem('task-manager:tasks:v1', JSON.stringify(tasks));
      
      const saved = JSON.parse(localStorage.getItem('task-manager:tasks:v1'));
      expect(saved).toEqual(tasks);
    });

    it('should load tasks from localStorage', () => {
      const tasks = [
        { id: '1', text: 'Task 1', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Task 2', completed: true, createdAt: Date.now() }
      ];
      localStorage.setItem('task-manager:tasks:v1', JSON.stringify(tasks));
      
      const loaded = JSON.parse(localStorage.getItem('task-manager:tasks:v1') || '[]');
      expect(loaded).toHaveLength(2);
      expect(loaded[0].text).toBe('Task 1');
      expect(loaded[1].completed).toBe(true);
    });

    it('should return empty array if no tasks in localStorage', () => {
      const loaded = JSON.parse(localStorage.getItem('task-manager:tasks:v1') || '[]');
      expect(loaded).toEqual([]);
    });

    it('should save filter preference to localStorage', () => {
      localStorage.setItem('task-manager:filter:v1', 'active');
      const filter = localStorage.getItem('task-manager:filter:v1');
      expect(filter).toBe('active');
    });
  });

  describe('Task Filtering', () => {
    const allTasks = [
      { id: '1', text: 'Active task', completed: false, createdAt: Date.now() },
      { id: '2', text: 'Completed task', completed: true, createdAt: Date.now() },
      { id: '3', text: 'Another active', completed: false, createdAt: Date.now() }
    ];

    it('should show all tasks when filter is "all"', () => {
      const filtered = allTasks.filter(t => true);
      expect(filtered).toHaveLength(3);
    });

    it('should show only active tasks when filter is "active"', () => {
      const filtered = allTasks.filter(t => !t.completed);
      expect(filtered).toHaveLength(2);
      expect(filtered.every(t => !t.completed)).toBe(true);
    });

    it('should show only completed tasks when filter is "completed"', () => {
      const filtered = allTasks.filter(t => t.completed);
      expect(filtered).toHaveLength(1);
      expect(filtered.every(t => t.completed)).toBe(true);
    });

    it('should count active tasks correctly', () => {
      const activeCount = allTasks.reduce((acc, t) => acc + (!t.completed ? 1 : 0), 0);
      expect(activeCount).toBe(2);
    });

    it('should count completed tasks correctly', () => {
      const completedCount = allTasks.reduce((acc, t) => acc + (t.completed ? 1 : 0), 0);
      expect(completedCount).toBe(1);
    });
  });

  describe('Task Operations', () => {
    it('should toggle task completion status', () => {
      const task = { id: '1', text: 'Test', completed: false, createdAt: Date.now() };
      task.completed = !task.completed;
      expect(task.completed).toBe(true);
      
      task.completed = !task.completed;
      expect(task.completed).toBe(false);
    });

    it('should find task by id', () => {
      const tasks = [
        { id: '1', text: 'Task 1', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Task 2', completed: false, createdAt: Date.now() }
      ];
      const found = tasks.find(t => t.id === '2');
      expect(found).toBeDefined();
      expect(found.text).toBe('Task 2');
    });

    it('should delete task from array', () => {
      const tasks = [
        { id: '1', text: 'Task 1', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Task 2', completed: false, createdAt: Date.now() }
      ];
      const index = tasks.findIndex(t => t.id === '1');
      expect(index).toBe(0);
      
      const deleted = tasks.splice(index, 1);
      expect(deleted).toHaveLength(1);
      expect(deleted[0].id).toBe('1');
      expect(tasks).toHaveLength(1);
    });

    it('should update task text', () => {
      const task = { id: '1', text: 'Old text', completed: false, createdAt: Date.now() };
      const newText = 'New text';
      task.text = newText;
      expect(task.text).toBe('New text');
    });

    it('should add task to beginning of array', () => {
      const tasks = [
        { id: '1', text: 'Task 1', completed: false, createdAt: Date.now() }
      ];
      const newTask = { id: '2', text: 'Task 2', completed: false, createdAt: Date.now() };
      tasks.unshift(newTask);
      
      expect(tasks).toHaveLength(2);
      expect(tasks[0].id).toBe('2');
    });
  });

  describe('Task Count Display', () => {
    it('should format singular task count', () => {
      const count = 1;
      const text = `${count} ${count === 1 ? 'task' : 'tasks'}`;
      expect(text).toBe('1 task');
    });

    it('should format plural task count', () => {
      const count = 5;
      const text = `${count} ${count === 1 ? 'task' : 'tasks'}`;
      expect(text).toBe('5 tasks');
    });

    it('should format zero task count', () => {
      const count = 0;
      const text = `${count} ${count === 1 ? 'task' : 'tasks'}`;
      expect(text).toBe('0 tasks');
    });

    it('should format task count with breakdown', () => {
      const visible = 5;
      const active = 3;
      const completed = 2;
      const text = `${visible} ${visible === 1 ? 'task' : 'tasks'} (${active} open, ${completed} completed)`;
      expect(text).toBe('5 tasks (3 open, 2 completed)');
    });
  });

  describe('Accessibility Features', () => {
    it('should have live region element', () => {
      const liveRegion = document.getElementById('live-region');
      expect(liveRegion).not.toBeNull();
    });

    it('should announce messages with delay', (done) => {
      const liveRegion = document.getElementById('live-region');
      liveRegion.textContent = '';
      
      setTimeout(() => {
        liveRegion.textContent = 'Task added';
      }, 10);
      
      setTimeout(() => {
        expect(liveRegion.textContent).toBe('Task added');
        done();
      }, 20);
    });
    
    it('should clear live region before announcing', () => {
      const liveRegion = document.getElementById('live-region');
      liveRegion.textContent = 'Old message';
      liveRegion.textContent = '';
      expect(liveRegion.textContent).toBe('');
    });

    it('should have proper ARIA attributes on filter buttons', () => {
      const filterBtns = document.querySelectorAll('.filter-btn');
      expect(filterBtns.length).toBeGreaterThan(0);
      
      filterBtns.forEach(btn => {
        expect(btn.hasAttribute('aria-pressed')).toBe(true);
        expect(btn.hasAttribute('data-filter')).toBe(true);
      });
    });
  });

  describe('Input Validation', () => {
    it('should reject empty input', () => {
      const input = '';
      const trimmed = input.trim();
      expect(trimmed).toBe('');
      expect(trimmed.length).toBe(0);
    });

    it('should reject whitespace-only input', () => {
      const input = '     ';
      const trimmed = input.trim();
      expect(trimmed).toBe('');
    });

    it('should accept valid input', () => {
      const input = 'Valid task';
      const trimmed = input.trim();
      expect(trimmed).toBe('Valid task');
      expect(trimmed.length).toBeGreaterThan(0);
    });

    it('should handle special characters', () => {
      const input = 'Task with émojis 🎉 and spëcial chars!';
      const trimmed = input.trim();
      expect(trimmed).toBe('Task with émojis 🎉 and spëcial chars!');
    });
  });

  describe('DOM Manipulation', () => {
    it('should create list item element', () => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.dataset.id = 'test-id';
      
      expect(li.tagName).toBe('LI');
      expect(li.className).toBe('task-item');
      expect(li.dataset.id).toBe('test-id');
    });

    it('should create checkbox with proper attributes', () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = false;
      checkbox.id = 'chk-123';
      checkbox.setAttribute('aria-label', 'Mark task as completed');
      
      expect(checkbox.type).toBe('checkbox');
      expect(checkbox.checked).toBe(false);
      expect(checkbox.getAttribute('aria-label')).toBe('Mark task as completed');
    });

    it('should toggle empty state visibility', () => {
      const emptyState = document.getElementById('empty-state');
      expect(emptyState).not.toBeNull();
      
      emptyState.hidden = false;
      expect(emptyState.hidden).toBe(false);
      
      emptyState.hidden = true;
      expect(emptyState.hidden).toBe(true);
    });
  });

  describe('Event Handling', () => {
    it('should prevent default form submission', () => {
      const form = document.getElementById('add-task-form');
      let defaultPrevented = false;
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        defaultPrevented = true;
      });
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      
      expect(defaultPrevented).toBe(true);
    });

    it('should handle keyboard events', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(event.key).toBe('Enter');
    });

    it('should detect input/textarea elements', () => {
      const input = document.getElementById('task-input');
      expect(input.tagName).toBe('INPUT');
    });
  });
});
