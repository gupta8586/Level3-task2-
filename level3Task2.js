let projects = [];

function createProject() {
    const projectName = document.getElementById('project-name').value;
    if (projectName) {
        const project = {
            id: projects.length + 1,
            name: projectName,
            tasks: []
        };
        projects.push(project);
        document.getElementById('project-name').value = '';
        renderProjects();
    }
}

function createTask(projectId) {
    const taskName = document.getElementById(`task-name-${projectId}`).value;
    if (taskName) {
        const project = projects.find(p => p.id === projectId);
        project.tasks.push({
            id: project.tasks.length + 1,
            name: taskName,
            completed: false
        });
        document.getElementById(`task-name-${projectId}`).value = '';
        renderProjects();
    }
}

function toggleTask(projectId, taskId) {
    const project = projects.find(p => p.id === projectId);
    const task = project.tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderProjects();
}

function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <input type="text" id="task-name-${project.id}" placeholder="New Task">
            <button onclick="createTask(${project.id})">Add Task</button>
            <ul>
                ${project.tasks.map(task => `
                    <li class="${task.completed ? 'completed' : ''}">
                        ${task.name}
                        <button onclick="toggleTask(${project.id}, ${task.id})">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </li>
                `).join('')}
            </ul>
        `;
        projectList.appendChild(projectElement);
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);
