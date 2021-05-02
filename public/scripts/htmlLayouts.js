let formCreateOperation = `
        <form class="newOperationSection" id="newOperationSection" method="POST">
            <img src="assets/icons/arrowLeft.svg" alt="icon-arrow left" id="comeBackBtn">
            <h2>New Operation</h2>
            <div class="amountDiv">
                <span>$</span>
                <input type="number" name="amount" required>
            </div>
            <div class="typeDiv">
                <p>Type of operation</p>
                <input type="radio" id="expense" name="type" value="expense">
                <label for="expense">Expense</label>
                <input type="radio" id="income" name="type" value="income">
                <label for="income">Income</label>
            </div>
            <div class="categoryDiv">
                <p>Category</p>
                <ul class="gridCategories" id="gridCategories">
                    
                </ul>
            </div>
            <div class="dateDiv">
                <p>Date</p>
                <input type="datetime" name="date" placeholder="dd/mm/yyyy" required>
                <img src="assets/icons/date.svg" alt="icon date">
            </div>
            <div class="commentaryDiv">
                <p>Commentary</p>
                <textarea name="commentary" id="" cols="30" rows="10" maxlength="250"></textarea>
            </div>
            <div class="btnsDiv">
                <button type="reset">Cancel</button>
                <button type="submit" class="saveBtn">Save</button>
            </div>
        </form>
    
    `;

let formDetailOperation = (op) => {
    let formatedDate = dateFormaterFromDB(op.date, 2);

    let html = `<form class="opSelectedDetails">
        <img src="assets/icons/arrowLeft.svg" alt="icon-arrow left" class="comeBackBtn">
        <div class="iconCateg" style="background-color: #${op.categoryInfo.color};">
            <img src="assets/icons/${op.categoryInfo.icon}" alt="icon ${op.categoryInfo.name}"/>
        </div>
        <input name="category_id" type="hidden" value="${op.categoryInfo.id}">
        <p class="categoryName">${op.categoryInfo.name}</p>
        <p class="totalOp"><span>$</span><input type="number" name="amount" value="${op.amount}" class="amount"></p>
        <input type="datetime" name="date" class="dateOp" value="${formatedDate}" placeholder="dd/mm/yyyy">
        <div class="commentsDiv">
            <p>Comments</p>
            <textarea name="commentary" cols="30"
                rows="10">${op.commentary}</textarea>
        </div>
        <div class="btnsDiv">
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </div>
    </form>`;
    return html
}

let adviseModal = (action) => {
    let html = `
    <div class="adviceModal">
        <div>
            <p>Are you sure you want to ${action} this operation?</p>
            <div>
                <button class="cancelBtn">Cancel</button>
                <button class="confirmBtn">${action}</button>
            </div>
        </div>
    </div>
    `
    return html
};

let opsByCategModal = (info) => {
    if (info.length == 0) {
        return
    }
    let htmlLi = "";
    info.forEach(op => {
        let dateFormated = dateFormaterFromDB(op.date, 2);
        htmlLi += `
        <li>
            <p class="dateOp">${dateFormated}</p>
            <p class="categoryName">${op.categoryInfo.name}</p>
            <p class="amountOp"><span>$</span><span class="amount">${op.amount}</span></p>
        </li>`
    })
    let html = `
    <div class="opsByCategory">
        <img src="assets/icons/arrowLeft.svg" alt="icon-arrow left" class="comeBackBtn">
        <div class="iconImg" style="background-color:#${info[0].categoryInfo.color}">
            <img src="assets/icons/${info[0].categoryInfo.icon}" alt="icon - ${info[0].categoryInfo.name}">
        </div>
        <p class="categoryName">${info[0].categoryInfo.name}</p>
        <ul class="allOperations">
            ${htmlLi}
        </ul>
    </div>
    `
    return html
}