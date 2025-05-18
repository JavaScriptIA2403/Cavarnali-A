const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskStatus = document.getElementById('task-status');
const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const filterButtons = document.querySelectorAll('[data-filter]');
const searchInput = document.getElementById('search-input');

let tasks = [];
let currentFilter = 'all';
let currentSearch = '';

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const status = taskStatus.value;

  if (text === '') {
    errorMsg.textContent = 'Введите текст задачи!';
    return;
  }
  errorMsg.textContent = '';

  const task = {
    id: Date.now(),
    text,
    completed: status === 'completed'
  };
  tasks.push(task);
  taskInput.value = '';
  renderTasks();
});

taskList.addEventListener('click', (e) => {
  const id = Number(e.target.closest('li')?.dataset?.id);
  if (e.target.classList.contains('delete-btn')) {
    tasks = tasks.filter(task => task.id !== id);
  }
  renderTasks();
});

taskList.addEventListener('dblclick', (e) => {
  if (!e.target.classList.contains('task-text')) return;
  const id = Number(e.target.closest('li').dataset.id);
  const span = e.target;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  input.className = 'task-text editable';
  span.replaceWith(input);
  input.focus();

  input.addEventListener('blur', () => {
    const newText = input.value.trim();
    if (newText) {
      tasks = tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      );
    }
    renderTasks();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
  });
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-text')) {
    const id = Number(e.target.closest('li').dataset.id);
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim().toLowerCase();
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = '';
  const filtered = tasks.filter(task => {
    const matchesFilter = currentFilter === 'all' ||
      (currentFilter === 'active' && !task.completed) ||
      (currentFilter === 'completed' && task.completed);

    const matchesSearch = task.text.toLowerCase().includes(currentSearch);

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    taskList.innerHTML = '<li>Нет задач</li>';
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="delete-btn">Удалить</button>
    `;
    taskList.appendChild(li);
  });
}

renderTasks();
