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

    console.log(formData);

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
        console.log('Success:', result);
        //alert('Registration successful!');
        window.location.href = '/confirmation';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
