let typeBtns = document.querySelectorAll('div.typeBtns >div');
let detailsOpSection = document.querySelectorAll('div.detailsOpSection');
let totalBalanceHTML = document.querySelector('#totalBalance .amount');
let expSec = document.querySelector('.expSec');
let incSec = document.querySelector('.incSec');
let resSum = 0;
let mainOperations = document.querySelector('.operationsMain');

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
        <li class="operation ${op.type}" id="${op.id}">
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
        createLiOperations(op, expSec.querySelector('.operationsList'))
    });
    let totalExp = bigSum(amountArrE);
    totalExp = new Intl.NumberFormat().format(totalExp);
    expSec.querySelector('.amount').textContent = totalExp;

    // sum of incomes amounts and creation of li 
    incOperations.forEach(op => {
        amountArrI.push(op.amount)
        createLiOperations(op, incSec.querySelector('.operationsList'))
    });
    let totalInc = bigSum(amountArrI);
    totalInc = new Intl.NumberFormat().format(totalInc);
    incSec.querySelector('.amount').textContent = totalInc;

    //apply the last date registered

    let formatedDateE = dateFormaterFromDB(expOperations[0].date, 1)
    expSec.querySelector('.dateOp').textContent = formatedDateE;

    let formatedDateI = dateFormaterFromDB(incOperations[0].date, 1)
    incSec.querySelector('.dateOp').textContent = formatedDateI;

    //eventListener of li operations
    let liOperations = document.querySelectorAll('li.operation');
    operationDetails(liOperations);
}
if (mainOperations) {
    operationsByType()
}


//sum of arrays

let bigSum = arr => {
    resSum = 0;
    arr.forEach(num => {
        resSum += num
    })
    resSum = resSum.toFixed(2);
    return resSum
}

async function getBalance() {
    let allOperations = await getOperations();
    let amountArrE = [];
    let amountArrI = [];
    let totalBalance;
    let userBalanceHTML = document.querySelector('#userBalance')

    //divide expenses and incomes
    let expOperations = allOperations.filter(op => op.type == "e");
    let incOperations = allOperations.filter(op => op.type == "i");

    // sum of expenses amounts and creation of li 
    expOperations.forEach(op => {
        amountArrE.push(op.amount)
    });
    let totalExp = bigSum(amountArrE)

    // sum of incomes amounts and creation of li 
    incOperations.forEach(op => {
        amountArrI.push(op.amount)
    });
    let totalInc = bigSum(amountArrI);

    totalBalance = totalInc - totalExp;
    totalBalance = totalBalance.toFixed(2);
    totalBalance = new Intl.NumberFormat().format(totalBalance);

    totalBalanceHTML.textContent = totalBalance;
    userBalanceHTML.textContent = totalBalance;
}

if (totalBalanceHTML) {
    getBalance()
}

