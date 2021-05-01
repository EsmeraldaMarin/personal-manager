
//create a new operation

let addOperation = document.querySelectorAll('.addOp');
addOperation.forEach(addOp => {
    addOp.addEventListener('click', () => {

        header.insertAdjacentHTML('afterend', formCreateOperation);

        let ulCategories = document.querySelector('#gridCategories');
        let categories = get7Categories();
        let catSelected = false;
        categories.then(res => {
            res.forEach(cat => {
                let element = `
                <li id=${cat.id}><div><img src="assets/icons/${cat.icon}" alt="icon - ${cat.name}"></div><span>${cat.name}</span></li>
                `
                ulCategories.insertAdjacentHTML('afterbegin', element);

                let categoryBtn = document.getElementById(`${cat.id}`);
                categoryBtn.addEventListener('click', e => {
                    if (!catSelected) {
                        categoryBtn.classList.add('selected')
                        categoryBtn.childNodes[0].style.backgroundColor = `#${cat.color}`;
                        catSelected = true;
                    } else {
                        let selectedIcon = document.querySelector('li.selected');
                        selectedIcon.classList.remove('selected');
                        selectedIcon.childNodes[0].style.backgroundColor = '#cae6e8';
                        categoryBtn.classList.add('selected');
                        categoryBtn.childNodes[0].style.backgroundColor = `#${cat.color}`;
                        catSelected = true;
                    }
                })

            })


        })

        let form = document.querySelector('#newOperationSection')
        let comeBackBtn = document.querySelector('#comeBackBtn');
        comeBackBtn.addEventListener('click', () => {
            form.classList.add('closeForm');
            setTimeout(() => {
                form.remove()
            }, 700);
        })
        form.addEventListener('submit', e => {
            let formData = new FormData(e.currentTarget);
            let categorySelected = document.querySelector('li.selected').id;

            formData.set('category_id', categorySelected);
            if (formData.get("type") == 'expense') {
                formData.set('type', 'e');
            } else {
                formData.set('type', 'i');
            }
            let formatedDate = dateFormater(formData.get('date'));
            formData.set('date', formatedDate);

            let params = {
                method: `POST`,
                type: 'no-cors',
                body: formData,
                headers: {
                    token: userToken
                }
            };
            fetch(urlOperations, params)
                .then(res => {
                    if (res.status == 400) {
                        console.log('Unexpected Error')
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))

        })

    })
})
