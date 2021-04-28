//get last 10 operations

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
        createLiOperations(op)
    });
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
    ulLastOperations.insertAdjacentHTML('beforeend', htmlOperation);
}