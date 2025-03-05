const API_BASE_URL = "http://localhost:8080/tasks";

// Function to fetch and display tasks
function fetchTasks() {
  fetch(API_BASE_URL)
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.textContent = `${task.name} - ${task.status}`;
        taskList.appendChild(taskDiv);
      });
    })
    .catch(error => console.error("Error fetching tasks:", error));
}

// Function to add a new task
function addTask(task) {
  console.log("Sending Task:", task); // ✅ Debugging

  fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  })
    .then(async response => {
      console.log("Response Status:", response.status); // ✅ Debugging
      let responseBody = await response.text();
      console.log("Response Body:", responseBody); // ✅ Debugging

      if (response.ok) {
        alert(responseBody);
        fetchTasks();
      } else {
        alert("Error: " + responseBody);
      }
    })
    .catch(error => console.error("Error adding task:", error));
}

// Event listener for form submission
document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const date = document.getElementById("taskDate").value.trim();

  if (!name || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const newTask = { name, date, status: "Pending" };

  addTask(newTask);
  this.reset();
});

// Initial load: fetch tasks
fetchTasks();
