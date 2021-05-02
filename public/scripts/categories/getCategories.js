let allExpCategoriesUl = document.querySelector('.allCategories.expSec');
let allIncCategoriesUl = document.querySelector('.allCategories.incSec');

function getCategories() {
    return new Promise((resolve, reject) => {
        fetch(urlCategories)
            .then(res => res.json())
            .then(info => {
                resolve(info)
            })
    })
}

async function getAllCategories() {
    let allCategories = await getCategories();
    return allCategories
}

let setCategories = () => {
    let allCategories = getAllCategories();
    allCategories.then(info => {
        let expCategories = info.filter(categ => categ.type == "e");
        let incCategories = info.filter(categ => categ.type == "i");

        expCategories.forEach(expCat => {
            let html = `
            <li id="${expCat.id}">
                <div style="background-color: #${expCat.color};"><img src="assets/icons/${expCat.icon}" alt="icon - ${expCat.name}"></div><span class="categoryName">${expCat.name}</span>
            </li>
            `;
            allExpCategoriesUl.insertAdjacentHTML('beforeend', html);
        });
        incCategories.forEach(incCat => {
            let html = `
            <li id="${incCat.id}">
                <div style="background-color: #${incCat.color};"><img src="assets/icons/${incCat.icon}" alt="icon - ${incCat.name}"></div><span class="categoryName">${incCat.name}</span>
            </li>
            `;
            allIncCategoriesUl.insertAdjacentHTML('beforeend', html);
        });
        detailsCategory()
    })
}

if (allExpCategoriesUl) {
    setCategories()
}

// on click event, show all operations by category

let detailsCategory = () => {
    let categoriesBtn = document.querySelectorAll('.allCategories li');
    let categoriesDiv = document.querySelector('.categoriesDiv');
    categoriesBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let id = btn.id;
            let allOperations = getOperations();
            allOperations.then(info => {

                //order by date
                info = info.sort((a, b) => {
                    if (a.date < b.date) {
                        return 1;
                    }
                    if (a.date > b.date) {
                        return -1;
                    }
                    return 0;
                });

                //filter by category
                let opsByCateg = info.filter(op => op.category_id == id);

                //add modal with operations by category
                let opsByCategModalHtml = opsByCategModal(opsByCateg);
                if (!opsByCategModalHtml) { return }
                categoriesDiv.insertAdjacentHTML('afterbegin', opsByCategModalHtml);

                //close modal 
                let divAdded = document.querySelector('.opsByCategory');
                let comeBackBtn = document.querySelector('.comeBackBtn')
                comeBackBtn.addEventListener('click', () => {
                    divAdded.remove();
                })
            })

        })
    })
}