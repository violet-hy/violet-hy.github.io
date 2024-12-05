const clientId = '463rvuhbiefinjch1atqikd49c';
const logoutRedirectUri = encodeURIComponent('https://violet-hy.github.io');
const cognitoDomain = 'https://us-west-1pu3kj4r7c.auth.us-west-1.amazoncognito.com';

const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutRedirectUri}`;

function isLoggedIn() {
    const idToken=sessionStorage.getItem('id_token')
    return idToken !== null;
}


function updateAuthButton() {
    const authButton = document.getElementById('login');
    if (isLoggedIn()) {
        // If logged in, set button to logout and update the onClick
        authButton.textContent = 'Log out';
        authButton.onclick = logout;  
    } else {
        // If not logged in, set button to login and update the onClick
        authButton.textContent = 'Login';
        authButton.onclick = login; 
    }
}


function login() {

    const callbackUrl = window.location.href;
    // login URL dynamically sets callback URL based on what page you log in from
    const loginUrl = `https://us-west-1pu3kj4r7c.auth.us-west-1.amazoncognito.com/login/continue?client_id=463rvuhbiefinjch1atqikd49c&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&scope=email+openid+phone`;
    window.location.href = loginUrl;
}

function logout() {
    window.location.href = logoutUrl;
    sessionStorage.removeItem('id_token');
}

// Update button on page load
document.addEventListener('DOMContentLoaded', updateAuthButton());