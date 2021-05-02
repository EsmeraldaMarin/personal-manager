let signinFormHtml = `<h1>Create Account</h1>
 <form>
   <div>
       <label for="name"></label>
       <input type="text" name="name" id="name" placeholder="Name">
   </div>
   <div>
       <label for="lastname"></label>
       <input type="text" name="lastname" id="lastname" placeholder="Lastname">
   </div>
   <div>
       <label for="email"></label>
       <input type="email" name="email" id="email" placeholder="Email">
   </div>
   <div>
       <label for="password"></label>
       <input type="password" name="password" id="password" placeholder="Password">
   </div>
   <div>
       <label for="repeatPassword"></label>
       <input type="password" id="repeatPassword" placeholder="Repeat password">
   </div>
   <button type="submit">Sign In</button>
</form>
 `
let loginFormHtml = `
<h1>Log In</h1>
<form>
    <div>
        <label for="email"><i class="fas fa-envelope"></i></label>
        <input type="email" name="email" id="email" placeholder="Email">
    </div>
    <div>
        <label for="password"><i class="fas fa-lock"></i></label>
        <input type="password" name="password" id="password" placeholder="Password">
    </div>
    <button type="submit">Log In</button>
</form>
`


let moveSectionBtn = document.getElementById('moveSectionBtn')
moveSectionBtn.addEventListener('click', () => {
    let parent = moveSectionBtn.parentElement;
    let loginSect = parent.previousElementSibling;
    parent.classList.toggle('signInMode')
    loginSect.classList.toggle('signInMode')
    if (parent.classList.contains('signInMode')) {
        //h2, img, button
        parent.children[0].textContent = 'Do you already have an account here?';
        parent.children[1].src = "assets/login.svg";
        parent.children[2].textContent = "Log In";

        setTimeout(() => {
            loginSect.innerHTML = signinFormHtml
        }, 250);

    } else {
        parent.children[0].textContent = 'Are you new here?';
        parent.children[1].src = "assets/signin.svg";
        parent.children[2].textContent = "Sign In";
        setTimeout(() => {
            loginSect.innerHTML = loginFormHtml
        }, 250);
    }
})
let formLogin = document.getElementById('formLogin')
formLogin.addEventListener('submit', e => {

    e.preventDefault()
    let formData = new FormData(e.currentTarget)
    let params = {
        method: 'GET',
        type: 'no-cors',
        body: formData
    };

    for (var pair of formData.entries()) {

        if (pair[1] == "") {
            console.log("falta rellenar el campo de " + pair[0])
            return
        }
    }
    fetch('http://localhost:3000/login', params)
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem("token", data.jwt)
                location.href = "http://127.0.0.1:5500/public/index.html";
            } else {
                console.log("incorrect user")
            }

        })
        .catch(err => console.log(err))
});
