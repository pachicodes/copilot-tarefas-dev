class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.setupEventListeners();
        this.updateUI();
        this.initializeTheme();
    }

    initializeTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-toggle').textContent = '☀️';
        }
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Theme toggle
        document.querySelector('.theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Filter changes
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterTasks());
        document.getElementById('priorityFilter').addEventListener('change', () => this.filterTasks());
    }

    addTask() {
        const task = {
            id: Date.now(),
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            category: document.getElementById('taskCategory').value,
            priority: document.getElementById('taskPriority').value,
            dueDate: document.getElementById('taskDueDate').value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.updateUI();
        document.getElementById('taskForm').reset();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.updateUI();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.updateUI();
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-theme');
        document.querySelector('.theme-toggle').textContent = this.isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', this.isDarkMode);
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    filterTasks() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;

        let filteredTasks = [...this.tasks];

        if (categoryFilter !== 'All') {
            filteredTasks = filteredTasks.filter(task => task.category === categoryFilter);
        }
        if (priorityFilter !== 'All') {
            filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
        }

        this.renderTasks(filteredTasks);
    }

    updateUI() {
        this.updateStats();
        this.updateFilters();
        this.renderTasks(this.tasks);
    }

    updateStats() {
        const activeTasks = this.tasks.filter(task => !task.completed).length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const highPriorityTasks = this.tasks.filter(task => task.priority === 'High').length;

        document.getElementById('activeTasks').textContent = activeTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('highPriorityTasks').textContent = highPriorityTasks;
    }

    updateFilters() {
        const categories = ['All', ...new Set(this.tasks.map(task => task.category))];
        const priorities = ['All', ...new Set(this.tasks.map(task => task.priority))];

        const categoryFilter = document.getElementById('categoryFilter');
        const priorityFilter = document.getElementById('priorityFilter');

        categoryFilter.innerHTML = categories.map(category => 
            `<option value="${category}">${category}</option>`
        ).join('');

        priorityFilter.innerHTML = priorities.map(priority => 
            `<option value="${priority}">${priority}</option>`
        ).join('');
    }

    renderTasks(tasksToRender) {
        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = '';

        tasksToRender.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.category.toLowerCase().replace(' ', '-')} ${task.completed ? 'completed' : ''}`;
            
            taskElement.innerHTML = `
                <div class="task-header">
                    <h3 class="task-title">${task.title}</h3>
                    <span class="task-category ${task.category.toLowerCase().replace(' ', '-')}">${task.category}</span>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    <span>Due in ${this.calculateDueDate(task.dueDate)}</span>
                    <div class="task-actions">
                        <button onclick="taskManager.toggleTaskCompletion(${task.id})">
                            ${task.completed ? '↩️' : '✓'}
                        </button>
                        <button onclick="taskManager.deleteTask(${task.id})">🗑️</button>
                    </div>
                </div>
            `;
            
            tasksList.appendChild(taskElement);
        });
    }

    calculateDueDate(dueDate) {
        const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (days < 0) return 'Overdue';
        if (days === 0) return 'Today';
        if (days === 1) return '1 day';
        return `${days} days`;
    }
}

// Função para alternar entre os temas
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Verificar se o tema atual é escuro
  if (body.classList.contains('dark-theme')) {
    // Mudar para tema claro
    body.classList.remove('dark-theme');
    if (themeToggle) themeToggle.textContent = '🌙'; // emoji lua
    localStorage.setItem('theme', 'light');
  } else {
    // Mudar para tema escuro
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️'; // emoji sol
    localStorage.setItem('theme', 'dark');
  }
}

// Função para carregar o tema salvo
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}

// Temporizador Pomodoro

// Variáveis do temporizador
let timer;
let isRunning = false;
let isPause = false;
let minutes = 25;
let seconds = 0;
let workTime = 25;
let breakTime = 5;

// Elementos DOM
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const timerLabel = document.getElementById('timer-label');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');
const presetBtns = document.querySelectorAll('.preset-btn');
const applyCustomBtn = document.getElementById('apply-custom');
const customWorkInput = document.getElementById('custom-work');
const customBreakInput = document.getElementById('custom-break');

// Sons de notificação (opcional)
const workCompleteSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3');
const breakCompleteSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Configuração dos botões do Pomodoro
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Configuração dos presets
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            workTime = parseInt(btn.dataset.work);
            breakTime = parseInt(btn.dataset.break);
            
            resetTimer();
        });
    });
    
    // Configuração personalizada
    applyCustomBtn.addEventListener('click', () => {
        const customWork = parseInt(customWorkInput.value);
        const customBreak = parseInt(customBreakInput.value);
        
        if (customWork > 0 && customBreak > 0) {
            workTime = customWork;
            breakTime = customBreak;
            
            presetBtns.forEach(b => b.classList.remove('active'));
            resetTimer();
        }
    });
    
    // Inicializar com os valores padrão
    updateTimerDisplay();
});

// Funções do temporizador
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    // Temporizador completo
                    clearInterval(timer);
                    
                    if (isPause) {
                        // Terminou a pausa, muda para sessão de trabalho
                        isPause = false;
                        minutes = workTime;
                        timerLabel.textContent = "Foco";
                        breakCompleteSound.play().catch(() => {});
                        
                        // Notificação
                        if (Notification.permission === "granted") {
                            new Notification("Pomodoro", {
                                body: "Hora de voltar ao trabalho!",
                                icon: "https://img.icons8.com/color/48/000000/tomato.png"
                            });
                        }
                    } else {
                        // Terminou o trabalho, muda para sessão de pausa
                        isPause = true;
                        minutes = breakTime;
                        timerLabel.textContent = "Pausa";
                        workCompleteSound.play().catch(() => {});
                        
                        // Notificação
                        if (Notification.permission === "granted") {
                            new Notification("Pomodoro", {
                                body: "Hora da pausa! Descanse um pouco.",
                                icon: "https://img.icons8.com/color/48/000000/coffee--v1.png"
                            });
                        }
                    }
                    
                    startTimer();
                }
            }
            
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPause = false;
    minutes = workTime;
    seconds = 0;
    timerLabel.textContent = "Foco";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    
    // Remover animação de piscar
    minutesDisplay.parentElement.classList.remove('timer-complete');
    
    // Adicionar animação de piscar nos últimos 10 segundos
    if (minutes === 0 && seconds <= 10 && isRunning) {
        minutesDisplay.parentElement.classList.add('timer-complete');
    }
}

// Solicitar permissão para notificações
function requestNotificationPermission() {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

// Solicita permissão quando o usuário interage com o temporizador pela primeira vez
startBtn.addEventListener('click', requestNotificationPermission);

// Função para exportar tarefas como CSV
function exportTasksToCSV() {
  // Obter todas as tarefas
  const tasks = getTasks();
  
  if (tasks.length === 0) {
    alert('Não há tarefas para exportar.');
    return;
  }
  
  // Definir cabeçalhos CSV
  const headers = [
    'ID', 
    'Título', 
    'Descrição', 
    'Categoria', 
    'Prioridade', 
    'Data de Entrega', 
    'Completada', 
    'Data de Criação', 
    'Última Atualização'
  ];
  
  // Criar a linha de cabeçalho
  let csvContent = headers.join(',') + '\n';
  
  // Adicionar cada tarefa ao conteúdo CSV
  tasks.forEach(task => {
    // Processar descrição para evitar quebras de linha e vírgulas
    const safeDescription = task.description ? 
      `"${task.description.replace(/"/g, '""')}"` : '';
      
    const row = [
      task.id,
      `"${task.title.replace(/"/g, '""')}"`,
      safeDescription,
      task.category,
      task.priority,
      task.dueDate || '',
      task.completed ? 'Sim' : 'Não',
      formatDateForCSV(task.createdAt),
      formatDateForCSV(task.updatedAt)
    ];
    
    csvContent += row.join(',') + '\n';
  });
  
  // Criar o blob e disparar o download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Criar um link
}

// Initialize the task manager
const taskManager = new TaskManager();

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Verifica se há uma preferência salva no localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    // Alterna entre temas claro e escuro
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });

    // Carregar o tema preferido do usuário
    loadSavedTheme();
  
    // Adicionar evento ao botão de exportação CSV
    const exportCSVBtn = document.getElementById('exportCSV');
    if (exportCSVBtn) {
        exportCSVBtn.addEventListener('click', exportTasksToCSV);
    }
  
    // Outros códigos de inicialização...
  
    // Certifique-se de que o toggle de tema está funcionando
    if (themeToggle && typeof toggleTheme === 'function') {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

<div class="export-btn-container">
  <button id="exportCSV" class="export-btn" title="Exportar tarefas como CSV">
    <span>📊 Exportar CSV</span>
  </button>
</div>
