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
    console.log(task);
    const taskContainer = document.getElementById('app');

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = task.text;


    const dateElement = document.createElement('p');
    dateElement.innerHTML = "Date de la tâche: "

    const responsibleElement = document.createElement('p');
    responsibleElement.innerHTML = "Responsable de la tâche: " + task.responsible;



    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = task.created_at;





    taskContainer.appendChild(titleElement);
    taskContainer.appendChild(dateElement);
    taskContainer.appendChild(responsibleElement);
    taskContainer.appendChild(descriptionElement);



    task.tags.forEach(tag => {
        let tagDiv = document.createElement('div');
        tagDiv.innerHTML = tag;
        taskContainer.appendChild(tagDiv)
    });

}

function fetchTasks() {
    const url = "http://localhost:3000/todos";

    fetch(url)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                // Vérifier si l'identifiant n'est pas défini ou si l'identifiant de la tâche ne correspond pas à celui dans l'URL
                if (!id || task.id !== id) {
                    displayTaskDetails(task);
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des tâches:', error);
        });
}

window.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    getItem();
});