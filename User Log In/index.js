document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector("#login");
    const createAccountf = document.querySelector("#createAccountf");
    
    document.querySelector("#create-account-link").addEventListener("click", e => {
    e.preventDefault();
    login.classList.add("form-hidden");
    createAccountf.classList.remove("form-hidden");
    });
    
    document.querySelector("#link-to-login").addEventListener("click", e => {
    e.preventDefault();
    login.classList.remove("form-hidden");
    createAccountf.classList.add("form-hidden")
    });
});


