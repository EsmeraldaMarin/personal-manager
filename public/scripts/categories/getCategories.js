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

        expCategories.forEach(expCat=>{
            let html = `
            <li ${expCat.id}>
                <div style="background-color: #${expCat.color};"><img src="assets/icons/${expCat.icon}" alt="icon - ${expCat.name}"></div><span class="categoryName">${expCat.name}</span>
            </li>
            `;
            allExpCategoriesUl.insertAdjacentHTML('beforeend', html)
        });
        incCategories.forEach(incCat=>{
            let html = `
            <li ${incCat.id}>
                <div style="background-color: #${incCat.color};"><img src="assets/icons/${incCat.icon}" alt="icon - ${incCat.name}"></div><span class="categoryName">${incCat.name}</span>
            </li>
            `;
            allIncCategoriesUl.insertAdjacentHTML('beforeend', html)
        });
    })
}

if (allExpCategoriesUl) {
    setCategories()
}

