//variables//
let urlOperations = 'http://localhost:3000/operations'

let burguerBtn = document.getElementById('burguerBtn');
let nav = document.querySelector('nav');

let ulLastOperations = document.getElementById('listOperations');

burguerBtn.addEventListener('click', () => {
    nav.classList.add('menuActive');

})
window.addEventListener('click', e => {
    if (!nav.contains(e.target) && !burguerBtn.contains(e.target)) {
        nav.classList.remove('menuActive');
    }
})

//get last 10 operations

function getOperations() {
    return new Promise((resolve, reject) => {
        fetch(urlOperations)
            .then(res => res.json())
            .then(info => {

                //seleccionar solo los del usuario --corregir desde bd. usar middleware
                resolve(info)
            })
    })
};
getOperations();

async function lastOperations() {
    let allOperations = await getOperations();
    let orderedOperations = allOperations.sort((a, b) => {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
        return 0;
    });
    let last10Operations = orderedOperations.slice(0, 10);
    //primero seleccionar las ultimas op, despues seleccionar las ultimas 10;

    last10Operations.forEach(op => {
        createLiOperations(op)
    });
    console.log(last10Operations)
}
lastOperations()

function createLiOperations(op) {
    let categoryInfo = op.categoryInfo;
    let htmlOperation = `
        <li class="operation">
            <div class="iconCateg">
                <img src="assets/icons/${categoryInfo.icon}" alt="icon ${categoryInfo.name}"/>
            </div>
            <p class="nameCateg">${categoryInfo.name}</p>
            <p class="amountOp"><span class="amount ${op.type}">${op.amount}</span></p>
        </li>
        `

    ulLastOperations.insertAdjacentHTML('afterbegin', htmlOperation);
}

