const clientId = '463rvuhbiefinjch1atqikd49c';  
        const logoutRedirectUri = 'https://violet-hy.github.io';  
        const cognitoDomain = 'https://us-west-1pu3kj4r7c.auth.us-west-1.amazoncognito.com';  

        const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutRedirectUri}`;

       
        function isLoggedIn() {
            const urlParams = new URLSearchParams(window.location.search);
            const idToken = urlParams.get('id_token') || (window.location.hash && window.location.hash.includes('id_token') ? new URLSearchParams(window.location.hash.substring(1)).get('id_token') : null);
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
        }

        // Run on page load to update the login/logout button
        updateAuthButton();
