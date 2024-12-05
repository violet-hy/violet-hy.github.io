function checkAndStoreIdToken() {
    // Grab the id_token hash from URL
    const urlParams = new URLSearchParams(window.location.search); 
    const idToken = urlParams.get('id_token') || (window.location.hash && window.location.hash.includes('id_token') ? new URLSearchParams(window.location.hash.substring(1)).get('id_token') : null);
    // Store it in session storage
    if (idToken) {
        sessionStorage.setItem('id_token', idToken);
    }
}

document.addEventListener('DOMContentLoaded', checkAndStoreIdToken())