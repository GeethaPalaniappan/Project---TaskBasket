
//craeting task cards
const createTaskHtml = (taskName,taskDescription,assignedTo,dueDate,id,taskStatus) => {

    const html = `
    <li class="list-group-item" id="taskCards" data-task-id = ${id}>
        <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
            <h5>${taskName}</h5>
            <span class="badge badge-danger" style="background-color: ${taskStatus === 'DONE' ? 'green' : 'red'}">${taskStatus}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <small>Assigned To: ${assignedTo}</small>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <small>Due: ${dueDate}</small>
        </div>
        <p>${taskDescription}</p>
        <button type="button" class="btn done-button btn-success ${taskStatus === 'DONE' ? 'invisible' : 'visible'}">Done</button>
        <button type="button" class="btn btn-danger delete-button">Delete</button>
    </li>
    `
    return html;

}


class TaskManager {
    constructor(currentID = 0){
        this.currentID = currentID 
        this.tasks = []

    }

    //delete the task - Create a new array without the elements we want removed included.
    deleteTask(taskId){

        const newTasks = [];

        //lop over the existing array
        this.tasks.forEach(task => {
        
            if(task.currentID != taskId)
                newTasks.push(task);

        });
        this.tasks = newTasks;
   
    }

    //load tasks from localstoarge to the app while loading
    load(){

        const tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson);
        }
        
        const currentId = localStorage.getItem('currentId');
        if (currentId) {
            this.currentID = JSON.parse(currentId); 
            // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);

        }
        

    }

    //Persisting Tasks to LocalStorage - save
    save(){

        let tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        let taskId = this.currentID.toString();
        localStorage.setItem('currentId', taskId);

    }

    //retrieve a task by passing taskid as parameter
    getTaskById(taskId){

        let foundTask;
        this.tasks.forEach(task => {
        
            if(task.currentID === taskId)
                foundTask = task;

        });
      
       return foundTask;
    }
    
    render(){

        const taskHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
        
            const task = this.tasks[i];
            
            //create html for tasks
            const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, task.dueDate, task.currentID,task.taskStatus);
         
            //add tasks to array
            taskHtmlList.push(taskHtml);

            //create tasksHtml
            const tasksHtml = taskHtmlList.join('\n')

            //create inner HTML for tasks
            const tasksList = document.querySelector('#tasksList');
            tasksList.innerHTML = tasksHtml;

         }
    }
    
    //adding new task to the tasks array
    addTask(taskname, description, assignedTo, dueDate) {
        const task = {
            currentID: this.currentID + 1,
            name: taskname,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate, 
            taskStatus: 'TODO'
        }
      
        this.tasks.push(task)
    } 
}


    
