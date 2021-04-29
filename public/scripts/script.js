//variables//
let urlOperations = 'http://localhost:3000/operations';
let urlCategories = 'http://localhost:3000/categories';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzbWVtYXJpbm0wM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InRva2VuMTIzIiwiaWF0IjoxNjE5NTcxNTYyfQ.jAXfOZqNpQmVU72wISfgjTFGZ9kfZFUveBwhbBzlQJA";
localStorage.setItem('token', token);
let userToken = localStorage.getItem('token')

let burguerBtn = document.getElementById('burguerBtn');
let nav = document.querySelector('nav');

let ulLastOperations = document.getElementById('listOperations');

let header = document.querySelector('header');

burguerBtn.addEventListener('click', () => {
    nav.classList.add('menuActive');

})
window.addEventListener('click', e => {
    if (!nav.contains(e.target) && !burguerBtn.contains(e.target)) {
        nav.classList.remove('menuActive');
    }
})

let dateFormater = (date) => {
    let stringSeparator, formatedDate;
    if (date.includes('/')) {
        stringSeparator = date.split("/");
    } else if (date.includes('-')) {
        stringSeparator = date.split("-");
    }
    formatedDate = `${stringSeparator[2]}/${stringSeparator[1]}/${stringSeparator[0]}`
    return formatedDate
}

let amountFormater = (allAmounts) => {
    allAmounts.forEach(amount => {
        let amountFormated = new Intl.NumberFormat().format(amount.textContent);
        amount.textContent = amountFormated;
    })
}