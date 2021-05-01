let getOperationById = (id) => {

    return new Promise((resolve, reject) => {
        fetch(`${urlOperations}/${id}`)
            .then(res => res.json())
            .then(info => {
                resolve(info)
            })
    })
}

function operationDetails(arrOperations) {
    arrOperations.forEach(op => {
        op.addEventListener('click', () => {
            let parentCtn = op.parentNode.parentNode.parentNode.parentNode;
            let opId = op.id;
            let opInfo = getOperationById(opId);

            opInfo.then(info => {
                let formOp = formDetailOperation(info);
                parentCtn.insertAdjacentHTML('afterbegin', formOp);

                let returnBtn = document.querySelector('.comeBackBtn');
                let form = document.querySelector('.opSelectedDetails');
                returnBtn.addEventListener('click', () => {
                    form.remove()
                })
                typeBtns.forEach(btn => {
                    btn.addEventListener('click', e => {
                        form.remove()
                    });
                });

                opActions(form, opId)
            })
        })
    })
}

let opActions = (form, id) => {
    let btnDelete = form.querySelector('.deleteBtn');
    let btnEdit = form.querySelector('.editBtn');
    let params = {
        method: "",
        body: "",
        type: 'no-cors'
    }
    btnDelete.addEventListener('click', (e) => {
        e.preventDefault();
        params.method = "DELETE";
        let confirmModal = adviseModal('delete');

        document.body.insertAdjacentHTML('afterbegin', confirmModal);

        let modal = document.querySelector('.adviceModal')
        let cancelBtn = document.querySelector('.cancelBtn');
        let confirmBtn = document.querySelector('.confirmBtn');

        cancelBtn.addEventListener('click', () => {
            modal.remove()
        })
        confirmBtn.addEventListener('click', () => {
            modal.remove();
            fetch(`${urlOperations}/${id}`, params)
                .then(res => res.json())
                .then(location.reload());
        })

    })
    btnEdit.addEventListener('click', (e) => {
        e.preventDefault();
        let formData = new FormData(form);

        let dateFormated = dateFormater(formData.get('date'));
        formData.set('date', dateFormated);
        params.method = "PUT";
        params.body = formData;

        let confirmModal = adviseModal('edit');

        document.body.insertAdjacentHTML('afterbegin', confirmModal);

        let modal = document.querySelector('.adviceModal')
        let cancelBtn = document.querySelector('.cancelBtn');
        let confirmBtn = document.querySelector('.confirmBtn');
        cancelBtn.addEventListener('click', () => {
            modal.remove()
        })
        confirmBtn.addEventListener('click', () => {
            modal.remove();
            fetch(`${urlOperations}/${id}`, params)
                .then(res => res.json())
                .then(location.reload());
        })

    })
}

