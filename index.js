function handleSubmitTodo() {
    const todoInput = document.querySelector("#todoInput");
    document.querySelector("#todoList").appendChild(createTodoItem(todoInput.value));
    saveTodo();
}

function readTodo() {
    try {
        return JSON.parse(localStorage.getItem("todoList"));
    } catch (e) {
        return [];
    }
}

function createTodoItem(todoText) {
    const newTodo = document.createElement("li");
    const removeButton = document.createElement("input", { type: "button" });
    removeButton.type = "button";
    removeButton.value = "Remove";
    newTodo.appendChild(document.createTextNode(todoText));
    removeButton.addEventListener("click", function() {
        newTodo.remove();
        saveTodo();
    });
    newTodo.appendChild(removeButton);
    newTodo.addEventListener("click", function() {
        if (newTodo.style.textDecoration === "line-through") {
            newTodo.style.textDecoration = "none"; 
        } else {
            newTodo.style.textDecoration = "line-through";
        }
    });
    return newTodo;
}

function loadTodo() {
    const todoList = document.querySelector("#todoList");
    const todoListArray = readTodo();
    for (let i = 0; i < todoListArray.length; i++) {
        todoList.appendChild(createTodoItem(todoListArray[i]));
    }
}

function saveTodo() {
    const todoList = document.querySelector("#todoList");
    const todoListItems = todoList.children;
    const todoListArray = [];
    for (let i = 0; i < todoListItems.length; i++) {
        todoListArray.push(todoListItems[i].textContent);
    }
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
}

document.addEventListener("DOMContentLoaded", function() {
    loadTodo();
});