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
        // If logged in, set button to logout and update the action
        authButton.textContent = 'Log out';
        authButton.onclick = logout;  // Update button to trigger logout
    } else {
        // If not logged in, set button to login and update the action
        authButton.textContent = 'Login';
        authButton.onclick = login;  // Update button to trigger login
    }
}


function login() {

    const callbackUrl = window.location.href;
    const loginUrl = `https://us-west-1pu3kj4r7c.auth.us-west-1.amazoncognito.com/login/continue?client_id=463rvuhbiefinjch1atqikd49c&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&scope=email+openid+phone`;
    window.location.href = loginUrl;
}

// Function to handle logout (redirect to Cognito's logout URL)
function logout() {
    window.location.href = logoutUrl;
    sessionStorage.removeItem('id_token');
}

// Run on page load to update the login/logout button
document.addEventListener('DOMContentLoaded', updateAuthButton());