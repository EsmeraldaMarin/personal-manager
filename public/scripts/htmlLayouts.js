let formCreateOperation = `
        <form class="newOperationSection" id="newOperationSection">
            <img src="assets/icons/arrowLeft.svg" alt="icon-arrow left" id="comeBackBtn">
            <h2>New Operation</h2>
            <div class="amountDiv">
                <span>$</span>
                <input type="number" name="amount">
            </div>
            <div class="typeDiv">
                <p>Type of operation</p>
                <input type="radio" id="expense" name="gender" value="expense">
                <label for="expense">Expense</label>
                <input type="radio" id="income" name="gender" value="income">
                <label for="income">Income</label>
            </div>
            <div class="categoryDiv">
                <p>Category</p>
                <ul class="gridCategories" id="gridCategories">
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                    <li><img src="assets/icons/coffee.svg" alt="icon - "></li>
                </ul>
            </div>
            <div class="dateDiv">
                <p>Date</p>
                <input type="datetime" name="date" placeholder="dd/mm/yyyy">
                <img src="assets/icons/date.svg" alt="icon date">
            </div>
            <div class="commentaryDiv">
                <p>Commentary</p>
                <textarea name="commentary" id="" cols="30" rows="10" maxlength="250"></textarea>
            </div>
            <div class="btnsDiv">
                <button>Cancel</button>
                <button type="submit" class="saveBtn">Save</button>
            </div>
        </form>
    
    `;