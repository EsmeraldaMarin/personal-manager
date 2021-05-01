
function getCategories() {
    return new Promise((resolve, reject) => {
        fetch(urlCategories)
            .then(res => res.json())
            .then(info => {
                resolve(info)
            })
    })
}

async function get7Categories() {
    let allCategories = await getCategories();
    let arrLength = allCategories.length;
    //let first7Categories = allCategories.slice(arrLength - 7, arrLength);
    return allCategories
}

