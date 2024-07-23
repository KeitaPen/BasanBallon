document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorMessage = document.getElementById('login-error-message');
        
        errorMessage.textContent = '';

        if (username === 'user' && password === 'password') {
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.color = 'red';
        }
    });

    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const errorMessage = document.getElementById('signup-error-message');
        
        errorMessage.textContent = '';

        if (username && email && password) {
            alert('Sign up successful! You can now log in.');
            document.getElementById('signup-username').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
        } else {
            errorMessage.textContent = 'Please fill in all fields';
            errorMessage.style.color = 'red';
        }
    });
});
