document.addEventListener('DOMContentLoaded', function() {
    // document.getElementById('registrationType').addEventListener('change', function() {
    //     const individualNameLabel = document.getElementById('individualNameLabel');
    //     const teamNameLabel = document.getElementById('teamNameLabel');

    //     if (this.value === 'individual') {
    //         individualNameLabel.style.display = 'block';
    //         teamNameLabel.style.display = 'none';
    //         document.getElementById('individualName').required = true;
    //         document.getElementById('teamName').required = false;
    //     } else if (this.value === 'team') {
    //         individualNameLabel.style.display = 'none';
    //         teamNameLabel.style.display = 'block';
    //         document.getElementById('individualName').required = false;
    //         document.getElementById('teamName').required = true;
    //     } else {
    //         individualNameLabel.style.display = 'none';
    //         teamNameLabel.style.display = 'none';
    //         document.getElementById('individualName').required = false;
    //         document.getElementById('teamName').required = false;
    //     }
    // });

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
            window.location.href = "/confirmation.html"; // Redirect to confirmation page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error with your registration. Please try again.');
        });

    });
});
