let prenom = document.getElementById('prenom');
prenom.innerHTML = localStorage.getItem('prenom');

const app = document.getElementById('app');
const url = "http://localhost:3000/todos";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const tasks = data[0].todolist;
        tasks.forEach(task => {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container');

            const p = document.createElement('p');
            const span = document.createElement('span');
            const input = document.createElement('input');
            const deleteButton = document.createElement('button');
            const viewButton = document.createElement('button');

            input.type = 'checkbox';
            input.checked = task.is_complete;
            input.classList.add('float-start', 'me-3');

            span.innerHTML = task.created_at;
            p.innerHTML = task.text;

            deleteButton.textContent = 'Supprimer';
            deleteButton.classList.add('btn', 'btn-danger', 'float-end');
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            viewButton.textContent = 'Voir';
            viewButton.classList.add('btn', 'btn-primary', 'float-end');
            viewButton.addEventListener('click', () => viewTaskDetails(task.id));

            taskContainer.appendChild(p);
            taskContainer.appendChild(span);
            taskContainer.appendChild(input);
            taskContainer.appendChild(deleteButton);
            taskContainer.appendChild(viewButton);
            app.appendChild(taskContainer);
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
    });




function viewTaskDetails(taskId) {
    window.location.href = `item.html?id=${taskId}`;
}

function deleteTask(taskId) {
    fetch(`http://localhost:3000/todos/${taskId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

const createTagsInput = () => {
    const formContainer = document.createElement('div');
    formContainerId = 'form-container';

    const form = document.createElement('form');
    form.id = 'task-form';

    const label = document.createElement('label');
    label.textContent = 'Ajouter une tâche:';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'add-task';
    input.name = 'task';

    const tagsLabel = document.createElement('label');
    tagsLabel.textContent = 'Tags:';

    const tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.id = 'add-tags';
    tagsInput.name = 'tags';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Ajouter';
    submitButton.classList.add('btn', 'btn-primary', 'me-5');

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(tagsLabel);
    form.appendChild(tagsInput);
    form.appendChild(submitButton);

    formContainer.appendChild(form);
    app.appendChild(formContainer);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskInput = document.getElementById('add-task');
        const taskValue = taskInput.value;
        const tagsInput = document.getElementById('add-tags');
        const tagsValue = tagsInput.value;
        addTask(taskValue, tagsValue);
    });
};

const addTask = (taskText, tagsText) => {
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: taskText,
            tags: tagsText.split(',').map(tag => tag.trim()),
            is_complete: false
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la tâche');
            }
            return response.json();
        })
        .then(data => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
};





createTagsInput();
