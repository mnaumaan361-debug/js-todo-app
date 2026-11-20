
let tasks = [];

let currentFilter = "all";


// 1. Add Task
function addTask() {

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: task,
        completed: false
    });

    input.value = "";

    displayTasks();
}


// 2. Show All Tasks + Filter Tasks
function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter((task) => {

        if (currentFilter === "completed") {
            return task.completed === true;
        }

        if (currentFilter === "pending") {
            return task.completed === false;
        }

        return true;

    });


    filteredTasks.forEach((task) => {

        let li = document.createElement("li");

        let span = document.createElement("span");

        span.innerText = task.text;


        // 3. Mark Task as Completed
        if (task.completed) {

            span.classList.add("completed");

        }


        // Complete Button
        let completeBtn = document.createElement("button");

        completeBtn.innerText = task.completed
            ? "Undo"
            : "Complete";

        completeBtn.classList.add("complete");

        completeBtn.onclick = function() {

            task.completed = !task.completed;

            displayTasks();

        };


        // 4. Edit Task
        let editBtn = document.createElement("button");

        editBtn.innerText = "Edit";

        editBtn.classList.add("edit");

        editBtn.onclick = function() {

            let updatedTask = prompt(
                "Edit your task",
                task.text
            );

            if (
                updatedTask !== null &&
                updatedTask.trim() !== ""
            ) {

                task.text = updatedTask.trim();

                displayTasks();

            }

        };


        // 5. Delete Task
        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";

        deleteBtn.classList.add("delete");

        deleteBtn.onclick = function() {

            tasks = tasks.filter((t) => t.id !== task.id);

            displayTasks();

        };


        li.appendChild(span);

        li.appendChild(completeBtn);

        li.appendChild(editBtn);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}


// 6. Filter Tasks
function filterTasks(filter) {

    currentFilter = filter;

    displayTasks();

}


// 7. Clear All Tasks
function clearAll() {

    tasks = [];

    displayTasks();

}
