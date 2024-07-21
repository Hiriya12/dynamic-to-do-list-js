document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    
    function addTask(taskText, save = true) {
        const taskItem = document.createElement('li');
        const taskLabel = document.createElement('span');
        const removeButton = document.createElement('span');

        taskLabel.textContent = taskText;
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-task');

        removeButton.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });

        taskItem.appendChild(taskLabel);
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        if (save) {
            saveTasks();
        }
    }

   
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    loadTasks();

   
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });
});