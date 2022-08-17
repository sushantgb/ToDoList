//variables related to input field, add button and list array
var task = document.querySelector(".add");
var adBtn = document.getElementById("insert");
var ul = document.querySelector("ul");
var listArray = [...document.querySelectorAll("li")];

//popup div related variables
var popClass = document.querySelector(".popup-display");
var popInput = document.querySelector(".edit-text");
var popSubmit = document.querySelector(".submit");
var popCancel = document.querySelector(".cancel");

var edited;  //global variable for targetting li during task editing

//function definition to add new task
function addTask() {
    if (task.value.length > 0) {
        let listVal = task.value.trim(); //removing whitespaces
        //shortening the string if quite long
        if (listVal.length > 30) {
            listVal = task.value.slice(0, 30) + "...";
        }
        //creating the list element
        let nodeVal = document.createElement("li");
        //for random unique ID for each li
        let randomID = parseInt(Math.random() * 10000);
        
        //related to storing and displaying date of creation
        let idDate = new Date();
        let day;
        console.log(idDate);
        //for printing day value in alphabet
        switch (idDate.getDay()) {
            case 0: day = "Sunday";
                break;
            case 1: day = "Monday";
                break;
            case 2: day = "Tuesday";
                break;
            case 3: day = "Wednesday";
                break;
            case 4: day = "Thursday";
                break;
            case 5: day = "Friday";
                break;
            case 6: day = "Saturday";
                break;
        }
        //to display task creation date within list
        let dateDisplay = idDate.getDate() + " - " + idDate.getMonth() + " - " + idDate.getFullYear() + " , " + day;
        console.log(dateDisplay);
        nodeVal.setAttribute("id", randomID); //assigning unique ID to <li>
        
        //content inside <li>
        nodeVal.innerHTML = `${listVal} 
            <div class="date">
                Created on : ${dateDisplay}
            </div>
            <div class="controls">
                <button class="done" title="Task Completed"><i class="bi bi-check-square"></i></button>
                <button class="delete" title="Delete Task"><i class="bi bi-x-square"></i></button>
                <button class="edit" title="Edit Task"><i class="bi bi-pencil-square"></i></button>
            </div>
            </li>`;

        //appending the <li> in <ul>
        ul.appendChild(nodeVal);
        console.log(ul.appendChild(nodeVal)); //for debugging purpose

        //pushing the data in the array of list
        listArray.push(nodeVal);
        task.value = null; //reseting the input field
        emptyListMessage(); //to display empty list if there is no task
    }
}

//function definition to strikethrough completed task
function taskFinished(event) {
    //recieving the target element
    let finishedTask = event.target.closest("li");
    //toggling the "finished" class to display strikethrough
    finishedTask.classList.toggle("finished");
}

//function definition to delete task
function deleteTask(event) {
    //recieving the target element
    let deletedTask = event.target.closest("li");

    //function to remove the target element from array and list
    function toDelete(deletedTask) {
        let deletedTaskIndex = listArray.indexOf(deletedTask);
        //removing the array element of selected index
        listArray.splice(deletedTaskIndex, 1);
        console.log(listArray); //for debugging purpose
        //removing the html text
        deletedTask.remove();
    }
    toDelete(deletedTask); //function call

    //to display empty list message in case all task are deleted
    emptyListMessage();
}

//function definition to edit the task
function editTask(event) {
    //popping up the div by making it visible and appear as popup window
    popClass.style.visibility = "visible";
    popClass.style.boxShadow = "5px 10px 1000px 20px #123453";
    console.log("popup - active"); //for debugging purpose

    edited = event.target.closest("li"); //target element

    //to receive the task text
    let textRecieve = edited.firstChild.textContent;

    //to remove whitespace and take cursor on the next character
    let textTrim = textRecieve.trim();

    popInput.value = textTrim; //displaying the text in input field

    //function to submit the edited the task
    function submitEdit() {
        if (popInput.value.length) {
            let editVal = popInput.value.trim();
            console.log(editVal);

            //to shorten the long text
            if (editVal.length > 30) {
                editVal = popInput.value.slice(0, 30) + "...";
            }

            //for random unique ID for each li
            var editedID = parseInt(Math.random() * 10000);

            //variable to update the date of modification/edit of task
            let editDate = new Date();
            let day;
            //switch statement to write day in alphabets
            switch (editDate.getDay()) {
                case 0: day = "Sunday";
                    break;
                case 1: day = "Monday";
                    break;
                case 2: day = "Tuesday";
                    break;
                case 3: day = "Wednesday";
                    break;
                case 4: day = "Thursday";
                    break;
                case 5: day = "Friday";
                    break;
                case 6: day = "Saturday";
                    break;
            }
            //to display date of modification
            let editDateDisplay = editDate.getDate() + " - " + editDate.getMonth() + " - " + editDate.getFullYear() + " , " + day;
            
            //assigning unique ID with "Edited" label
            edited.setAttribute("id", editedID + "-edited");
            //content inside the edited <li>
            edited.innerHTML = `${editVal} 
                <div class="date">
                    Modified On : ${editDateDisplay}
                </div>
                <div class="controls">
                    <button class="done" title="Task Completed"><i class="bi bi-check-square"></i></button>
                    <button class="delete" title="Delete Task"><i class="bi bi-x-square"></i></button>
                    <button class="edit" title="Edit Task"><i class="bi bi-pencil-square"></i></button>
                </div>
                </li>`;
            closepopup(); //after submit close the popup
        }
    }
    popSubmit.addEventListener("click", submitEdit);    //for submit button
    popCancel.addEventListener("click", closepopup);   //for cancel button
}

//definition for closing the popup div
function closepopup() {
    popClass.style.visibility = "hidden";
}

//task management controls (edit, delete, done)
function taskManagement(event) {
    //checking for the corresponding class name for the selected button
    if (event.target.className == "bi bi-check-square") {
        taskFinished(event);
        console.log(event.target.classList);
    } else if (event.target.className == "bi bi-x-square") {
        deleteTask(event);
    } else if (event.target.className == "bi bi-pencil-square") {
        editTask(event);
    }
}

//to display empty list message in case task list is empty or fully deleted
function emptyListMessage() {
    if (!listArray.length) {
        listremark.style.display = "block";
    } else listremark.style.display = "none";
};

//event for input field if someone uses keyboard to enter task
task.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        adBtn.click();
    }
});

//event for input field if someone uses keyboard to update task
popInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        popSubmit.click();
    }
});

//events for add button and task controls
adBtn.addEventListener("click", addTask);
ul.addEventListener("click", taskManagement);