let typeBtns = document.querySelectorAll('div.typeBtns >div');
let detailsOpSection = document.querySelectorAll('div.detailsOpSection');
let expSec = document.querySelector('.expSec');
let incSec = document.querySelector('.incSec');
let resSum = 0;

function getOperations() {
    let params = {
        method: `GET`,
        type: 'no-cors',
        headers: {
            token: userToken,
        },
    };
    return new Promise((resolve, reject) => {
        fetch(urlOperations, params)
            .then(res => res.json())
            .then(info => {
                resolve(info)
            })
    })
};
getOperations();

async function lastOperations() {
    let allOperations = await getOperations();
    let orderedOperations = allOperations.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;
    });
    let last10Operations = orderedOperations.slice(0, 10);
    //primero seleccionar las ultimas op, despues seleccionar las ultimas 10;

    last10Operations.forEach(op => {
        createLiOperations(op, ulLastOperations)
    });
}
if (ulLastOperations) {
    lastOperations()
}

function createLiOperations(op, parent) {
    let categoryInfo = op.categoryInfo;
    op.amount = new Intl.NumberFormat().format(op.amount)
    let htmlOperation = `
        <li class="operation">
            <div class="iconCateg" style="background-color: #${categoryInfo.color};">
                <img src="assets/icons/${categoryInfo.icon}" alt="icon ${categoryInfo.name}"/>
            </div>
            <p class="nameCateg">${categoryInfo.name}</p>
            <p class="amountOp"><span class="amount ${op.type}">${op.amount}</span></p>
        </li>
        `
    parent.insertAdjacentHTML('beforeend', htmlOperation);
}

if (typeBtns) {
    typeBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            typeBtns.forEach(btn => {
                btn.classList.remove('activeType')
            });
            btn.classList.add('activeType');

            if (btn.classList.contains('expBtn')) {
                expSec.classList.add('activeSection');
                incSec.classList.remove('activeSection');
            } else {
                expSec.classList.remove('activeSection');
                incSec.classList.add('activeSection');
            }
        });
    });
}

async function operationsByType() {
    let allOperations = await getOperations();
    let amountArrE = [];
    let amountArrI = [];

    //order all operations
    let orderedOperations = allOperations.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;
    });

    //divide expenses and incomes
    let expOperations = orderedOperations.filter(op => op.type == "e");
    let incOperations = orderedOperations.filter(op => op.type == "i");


    // sum of expenses amounts and creation of li 
    expOperations.forEach(op => {
        amountArrE.push(op.amount)
        createLiOperations(op, expSec.querySelector('#operationsList'))
    });
    let totalExp = bigSum(amountArrE)
    expSec.querySelector('.amount').textContent = totalExp;

    // sum of incomes amounts and creation of li 
    incOperations.forEach(op => {
        amountArrI.push(op.amount)
        createLiOperations(op, incSec.querySelector('#operationsList'))
    });
    let totalInc = bigSum(amountArrI);
    incSec.querySelector('.amount').textContent = totalInc;

    //apply the last date registered

    let dateE = new Date(expOperations[0].date);
    let formatedDateE = dateFormaterFromDB(dateE)
    expSec.querySelector('.dateOp').textContent = formatedDateE;

    let dateI = new Date(incOperations[0].date);
    let formatedDateI = dateFormaterFromDB(dateI)
    incSec.querySelector('.dateOp').textContent = formatedDateI;
}
if (expSec) {
    operationsByType()
}


//sum of arrays

let bigSum = arr => {
    resSum = 0;
    arr.forEach(num => {
        resSum += num
    })
    resSum = resSum.toFixed(2);
    resSum = new Intl.NumberFormat().format(resSum)
    return resSum
}

//date formater from YYYY-MM-DD to MONTH DD - YYYY

let dateFormaterFromDB = date => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let newDate;
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

    return newDate
}

