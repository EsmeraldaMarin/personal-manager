//variables//
let urlOperations = 'http://localhost:3000/operations';
let urlCategories = 'http://localhost:3000/categories';
let urlUsers = 'http://localhost:3000/users';
let token = localStorage.getItem('token')
let burguerBtn = document.getElementById('burguerBtn');
let ulLastOperations = document.getElementById('listOperations');
let userInfoCtn = document.querySelector('.userInfo')
let nav = document.querySelector('nav');
let header = document.querySelector('header');
let logOutBtn = document.querySelector('.logOut');


//login 

function selectUser(token) {

    if (!token) {
        location.href = "http://127.0.0.1:5500/public/login.html";
        return
    }

     fetch(`${urlUsers}/${token}`)
        .then(res => res.json())
        .then(data => {
            userInfoCtn.querySelector('#userName').textContent = data.name;
            userInfoCtn.querySelector('#userLastname').textContent = data.lastname;
        }) 
}
selectUser(token)

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    location.href = "http://127.0.0.1:5500/public/login.html";
})


//burguer menu

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

        day = day.toString();
        if (day.length == 1) {
            day = "0" + day;
        }

        month = month + 1;
        month = month.toString();
        if (month.length == 1) {
            month = "0" + month;
        }

        newDate = `${day}/${month}/${year}`
    }

    return newDate
}