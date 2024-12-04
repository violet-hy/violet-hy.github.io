function checkAndStoreIdToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const idToken = urlParams.get('id_token') || (window.location.hash && window.location.hash.includes('id_token') ? new URLSearchParams(window.location.hash.substring(1)).get('id_token') : null);

    if (idToken) {
        sessionStorageStorage.setItem('id_token', idToken);
        console.log(idToken);
    }
}

document.addEventListener('DOMContentLoaded', checkAndStoreIdToken())