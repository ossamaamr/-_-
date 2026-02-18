let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;

    if (title.trim() === "") return;

    const task = {
        id: Date.now(),
        title,
        priority,
        category,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    document.getElementById("taskTitle").value = "";
}

function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `${task.priority} ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">${task.title}</span>
            <button onclick="deleteTask(${task.id})">حذف</button>
        `;
        list.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("progressPercent").textContent = percent + "%";
    document.getElementById("progressFill").style.width = percent + "%";
}

function filterTasks(type) {
    renderTasks(type);
}

renderTasks();
