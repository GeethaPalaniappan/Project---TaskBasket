
//taskmanager class object (instantiating taskManager)
const taskList = new TaskManager();


// form input elements
let btnTask = document.getElementById('taskSubmit');
let taskName = document.getElementById('inputTaskName');
let taskDescription = document.getElementById('inputDescription');
let taskAssignedTo = document.getElementById('inputAssignedTo');
let taskDueDate = document.getElementById('inputDuedate');
let alertBox = document.getElementById('alertDiv');
let taskAlert = document.getElementById('labelAlert');
let alertMessage = '';
const tasksCardList = document.querySelector('#tasksList');

//disabling past dates in due date 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
setDueDate();

//render tasks from localStorage
taskList.load();
taskList.render();

//input form validation
function validateInput(){
try
{

    alertMessage = '';

    if(taskName.value.trim() === '')
        buildAlert('Task Name'); 
        
   if(taskDescription.value.trim() === '')
        buildAlert('Task Description'); 

    if(taskAssignedTo.value.trim() === '')
        buildAlert('Assigned To'); 
   
    if(taskDueDate.value.trim() === '')
        buildAlert('Due Date');  
        
    if(alertMessage === '')
    {
        alertBox.style.display='none';
        addNewTask();
       
    } 
    else
    {
        alertBox.style.display='inline-block';
        alertMessage = alertMessage + ' required';
        taskAlert.innerHTML = alertMessage;
        
    }

}catch(error){
    console.log(error);
}

}

//build alert message straing
function buildAlert(message){

    if(alertMessage === '')
        alertMessage = message;
        
    else
        alertMessage = alertMessage + ', ' + message; 

}

//buttton Add Task EventListener
btnTask.addEventListener('click',validateInput);

//adding new task to the task list & also to the form after the form is validated
function addNewTask() {
    taskList.addTask(taskName.value, taskDescription.value, taskAssignedTo.value, taskDueDate.value );
    taskList.currentID++;
    taskList.render();
    taskList.save();
    clearForm();
    
}

//clear form
function clearForm(){
    taskName.value= '';
    taskDescription.value = '';
    taskAssignedTo.value = '';
    taskDueDate.value= '';

}

//set due date 
function setDueDate() {
    if(dd<10){
        dd='0'+dd
      } 
      if(mm<10){
        mm='0'+mm
      } 
      
      today = yyyy+'-'+mm+'-'+dd;
      taskDueDate.setAttribute("min", today);
    }

    //Setting an EventListener to the Buttons on Tasks
    tasksCardList.addEventListener('click', (event) => { 
    try{

        //EventListener action to the done Button    
        if(event.target.classList.contains('done-button')){
            const parentTask = event.target.parentElement;
            const taskId = Number(parentTask.getAttribute('data-task-id'));
            const task = taskList.getTaskById(taskId);
            task['taskStatus'] = 'DONE';
            taskList.render();
            taskList.save();
        }

        //EventListener action to the Delete Button
        if(event.target.classList.contains('delete-button')){
            const parentTask = event.target.parentElement;
            const taskId = Number(parentTask.getAttribute('data-task-id'));
            taskList.deleteTask(taskId);
            taskList.save();
            tasksCardList.removeChild(parentTask);   
            taskList.render();
        }
    }
    catch(error){
        console.log(error);
    }  
});