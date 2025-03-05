const API_BASE_URL = "http://localhost:8080/tasks";

// Fetch tasks
function fetchTasks() {
    fetch(API_BASE_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${task.name} - ${task.status} - ${task.date}</span>
                    <button class="edit-btn" onclick="editTask(${task.id}, '${task.name}', '${task.status}', '${task.date}')">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
}

// Add Task
function addTask(task) {
    fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchTasks();
        })
        .catch(error => console.error("Error adding task:", error));
}

// Update Task
function updateTask(id, task) {
    fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchTasks();
            document.getElementById("submitButton").textContent = "Add Task";
        })
        .catch(error => console.error("Error updating task:", error));
}

// Edit Task
function editTask(id, name, status, date) {
    document.getElementById("taskId").value = id;
    document.getElementById("taskName").value = name;
    document.getElementById("taskDate").value = date;  // Setting the date input value
    document.getElementById("taskStatus").value = status;  // Setting the status dropdown value
    document.getElementById("submitButton").textContent = "Update Task";
}

// Delete Task
function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
        })
            .then(response => response.text())
            .then(message => {
                alert(message);
                fetchTasks();
            })
            .catch(error => console.error("Error deleting task:", error));
    }
}

// Form Submission
document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("taskId").value;
    const name = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;
    const status = document.getElementById("taskStatus").value;
    const task = { name, date, status };

    if (id) {
        updateTask(id, task);
    } else {
        addTask(task);
    }

    this.reset();
    document.getElementById("taskId").value = "";
});

// Load tasks on page load
fetchTasks();
