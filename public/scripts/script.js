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

//date formater from YYYY-MM-DD to MONTH DD - YYYY

let dateFormaterFromDB = (dateFromDB, definer) => {
    let date = new Date(dateFromDB);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let newDate;
    if (definer == 1) {
        switch (month) {
            case 0: month = "January";
                break;
            case 1: month = "February";
                break;
            case 2: month = "March";
                break;
            case 3: month = "April";
                break;
            case 4: month = "May";
                break;
            case 5: month = "June";
                break;
            case 6: month = "July";
                break;
            case 7: month = "August";
                break;
            case 8: month = "September";
                break;
            case 9: month = "October";
                break;
            case 10: month = "November";
                break;
            case 11: month = "December";
                break;
        }

        newDate = `${month} ${day} - ${year}`;
    } else if (definer == 2) {
        newDate = `${day}/${month + 1}/${year}`
    }

    return newDate
}