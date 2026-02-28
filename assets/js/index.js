function checkPass() {
    let pwd = document.getElementById('pwd').value;
    if (MD5.generate(pwd) == 'c521b9c32ee2ae1bebf044f4a84933d3') {
        console.log('hi');
        localStorage.setItem("violethy-pwd-check", MD5.generate(pwd))
        window.location.assign("/game");
    }
    else {
        console.log('no');
        
    }
}

document.addEventListener("submit", (event) => {
    event.preventDefault();
    checkPass();
})


