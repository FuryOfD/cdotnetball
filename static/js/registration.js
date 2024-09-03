document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Capture form data
    const formData = {
        registrationType: document.getElementById('registrationType').value,
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        individualName: document.getElementById('individualName').value,
        teamName: document.getElementById('teamName').value
    };

    // Send data to backend via POST request
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(result => {
        alert('Registration successful!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
