const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let todo = {};



function getItem() {
    if (!!id) {
        console.log("id:", id);
        return fetch('http://localhost:3000/todos/' + id)
            .then((response) => response.json())
            .then((json) => {
                todo = json;

                displayTaskDetails(todo);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de l\'élément:', error);
            });
    } else {
        console.log("Aucun id")
    }
}

function displayTaskDetails(task) {

    const taskContainer = document.getElementById('app');

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = task.text;


    const dateElement = document.createElement('p');
    dateElement.innerHTML = "Date de la tâche: "

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = task.created_at;


    taskContainer.appendChild(titleElement);
    taskContainer.appendChild(dateElement);

    taskContainer.appendChild(descriptionElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('btn', 'btn-danger', 'float-end');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    taskContainer.appendChild(deleteButton);

    task.Tags.forEach(tag => {
        let tagDiv = document.createElement('div');
        tagDiv.innerHTML = tag;
        taskContainer.appendChild(tagDiv)
    });

}

function deleteTask(taskId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        fetch(`http://localhost:3000/todos/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                alert('Tâche supprimée avec succès');
                window.location.href = 'tasks.html';
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }
}


window.addEventListener('DOMContentLoaded', () => {
    getItem();
});