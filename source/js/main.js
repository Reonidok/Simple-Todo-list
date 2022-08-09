let todoitemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveButton = document.getElementById("saveTodoButton");


saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));


};

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);


    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}


let todoList = getTodoListFromLocalStorage();

let todosCount = todoList.length;


function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter valid text");
        return;
    }

    todosCount++;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };


    todoList.push(newTodo);


    createAndAppendTodo(newTodo);
    userInputElement.value = "";

}

addTodoButton.onclick = function() {
    onAddTodo();
}


function createAndAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;


    todoitemsContainer.appendChild(todoElement);


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";

    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");

    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);


    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("delete-icon", "far", "fa-trash-alt");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }

    function onTodoStatusChange(checkboxId, labelId, todoId) {
        let checkboxElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);
        labelElement.classList.toggle("checked");


        let todoObjectIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        let todoObject = todoList[todoObjectIndex];

        if (todoObject.isChecked === true) {
            todoObject.isChecked = false;
        } else {
            todoObject.isChecked = true;
        }


    }


    function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoitemsContainer.removeChild(todoElement);



        let deleteElementIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodo == todoId) {
                return true;
            } else {
                return false;
            }
        });
        todoList.splice(deleteElementIndex, 1);

    }


}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}