let prenom = document.getElementById('prenom');

let btn = document.getElementById('form');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (prenom.value == "") {
        alert('vous devez saisir votre prenom');
    } else {
        localStorage.setItem('prenom', prenom.value);
        window.location.href = 'tasks.html';
    }
})

