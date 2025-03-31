/*
    {
        id: "", 
        name: 'task1',
        date: '2021-01-01',
        done: false
    },
*/
const tasks = [];

const addTask = () => {
    const name = document.getElementById('task').value;
    const date = new Date().toISOString();
    tasks.push({
        id: date,
        name,
        date,
        done: false
    });
    document.getElementById('task').value = '';
    renderTasks();
}
const renderTasks = () => {
    const tasksDiv = document.getElementById('tasks');
    if (tasks.length === 0) {
        tasksDiv.innerHTML = 'No tasks';
        return;
    }
    tasksDiv.innerHTML = '';
    const taskList = document.createElement('ul');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = task.name;
        taskList.appendChild(li);
    });
    tasksDiv.appendChild(taskList);
}
