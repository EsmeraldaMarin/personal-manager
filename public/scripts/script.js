let burguerBtn = document.getElementById('burguerBtn');
let nav = document.querySelector('nav')

burguerBtn.addEventListener('click', () => {
    nav.classList.add('menuActive');

})
window.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !burguerBtn.contains(e.target)) {
        nav.classList.remove('menuActive');
    }
})


