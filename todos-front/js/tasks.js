let prenom = document.getElementById('prenom');
prenom.innerHTML = localStorage.getItem('prenom');

let app = document.getElementById('app');


let url = "http://localhost:3000/todos";

fetch(url).then(elements => {
    elements.json().then(tasks => {
        tasks = tasks[0].todolist;

        tasks.forEach(task => {
            let p = document.createElement('p');
            let span = document.createElement('span');
            let input = document.createElement('input');
            span.innerHTML = task.created_at;
            p.innerHTML = task.text;
            input.innerHTML = task.is_complete;

            app.appendChild(p);
            app.appendChild(span);
            app.appendChild(input);
        });
    })
})

function displayList() {
    const app = document.getElementById('app');
    const ul = document.createElement('ul');
    ul.classList.add("list-group");
    const list = todos[0].todolist;
    let input = document.createElement('input');
    input.classList.add("form-check-input", "float-start");





}
