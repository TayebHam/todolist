
document.addEventListener('DOMContentLoaded', function () {

    const app = document.getElementById('app');


    function fetchStats() {
        const url = "http://localhost:3000/todos/";

        fetch(url)
            .then(response => response.json())
            .then(stats => {

                let tasks = stats[0].todolist;

                let todo = 0;
                let complete = 0;

                tasks.forEach(task => {
                    if (task.is_complete) {
                        complete = complete + 1;
                    } else {
                        todo++;
                    }

                });

                console.log(todo);
                console.log(complete);

                displayStats({ totalTasks: tasks.length, completedTasks: complete, incompleteTasks: todo });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des statistiques:', error);
            });
    }


    function displayStats(stats) {

        const totalTasksElement = document.createElement('p');
        totalTasksElement.innerHTML = "Total des tâches: " + stats.totalTasks;

        const completedTasksElement = document.createElement('p');
        completedTasksElement.innerHTML = "Tâches terminées: " + stats.completedTasks;

        const incompleteTasksElement = document.createElement('p');
        incompleteTasksElement.innerHTML = "Tâches incomplètes: " + stats.incompleteTasks;


        app.appendChild(totalTasksElement);
        app.appendChild(completedTasksElement);
        app.appendChild(incompleteTasksElement);
    }


    fetchStats();
});
