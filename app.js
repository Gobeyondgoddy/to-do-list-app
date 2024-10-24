let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
        taskInput.value = ''; // Clear input after adding task
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                ${task.completed ? `<span class="delete" onClick="deleteTask(${index})">-</span>` : ''}
            </div>
        </div>
        `;

        listItem.querySelector('input[type="checkbox"]').addEventListener("change", () => toggleTaskComplete(index));

        taskList.append(listItem);
    });

    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

const editTask = (index) => {
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        updateTasksList();
    }
};

// Function to clear all completed tasks
const clearCompletedTasks = () => {
    tasks = tasks.filter(task => !task.completed);  // Remove completed tasks
    updateTasksList();
};

const updateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    const progress = document.getElementById("progress");
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progress.style.width = `${progressPercentage}%`;
};

// Event listener for adding new tasks
document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

// Event listener for clearing completed tasks
document.getElementById("clearCompleted").addEventListener("click", function () {
    clearCompletedTasks();
});







