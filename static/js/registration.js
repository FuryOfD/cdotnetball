document.addEventListener('DOMContentLoaded', function() {
    const registrationType = document.getElementById('registrationType');
const individualNameLabel = document.getElementById('individualNameLabel');
const teamNameLabel = document.getElementById('teamNameLabel');
const teamPlayersSection = document.getElementById('teamPlayersSection');
const addPlayerBtn = document.getElementById('addPlayerBtn');
const teamPlayersContainer = document.getElementById('teamPlayersContainer');

registrationType.addEventListener('change', function() {
    if (this.value === 'individual') {
      individualNameLabel.style.display = 'block';
      teamNameLabel.style.display = 'none';
      teamPlayersSection.style.display = 'none';
    } else if (this.value === 'team') {
      individualNameLabel.style.display = 'none';
      teamNameLabel.style.display = 'block';
      teamPlayersSection.style.display = 'block';
    }
  });

  // Add player button
  document.getElementById('addPlayerBtn').addEventListener('click', function() {
    const playerCount = document.querySelectorAll('.team-player').length + 1;
    const newPlayer = document.createElement('label');
    newPlayer.innerHTML = `<input placeholder="Player ${playerCount} Name" type="text" class="input team-player" />`;
    document.getElementById('teamPlayersContainer').appendChild(newPlayer);

    // Show the remove button if there's more than one player
    if (playerCount > 1) {
        document.getElementById('removePlayerBtn').style.display = 'block';
    }
});

// Remove player button
document.getElementById('removePlayerBtn').addEventListener('click', function() {
    const playerInputs = document.querySelectorAll('.team-player');
    if (playerInputs.length > 1) {
        playerInputs[playerInputs.length - 1].parentElement.remove(); // Remove the last player input
    }

    // Hide the remove button if only one player remains
    if (playerInputs.length <= 2) {
        document.getElementById('removePlayerBtn').style.display = 'none';
    }
});


    document
        .getElementById("registrationType")
        .addEventListener("change", function () {
          const individualNameLabel = document.getElementById(
            "individualNameLabel"
          );
          const teamNameLabel = document.getElementById("teamNameLabel");

          if (this.value === "individual") {
            individualNameLabel.style.display = "block";
            teamNameLabel.style.display = "none";
            document.getElementById("individualName").required = true;
            document.getElementById("teamName").required = false;
          } else if (this.value === "team") {
            individualNameLabel.style.display = "none";
            teamNameLabel.style.display = "block";
            document.getElementById("individualName").required = false;
            document.getElementById("teamName").required = true;

          } else {
            individualNameLabel.style.display = "none";
            teamNameLabel.style.display = "none";
            document.getElementById("individualName").required = false;
            document.getElementById("teamName").required = false;
          }
        });

    document.querySelectorAll('input[name="isChild"]').forEach((elem) => {
        elem.addEventListener('change', function(event) {
            if (event.target.value === 'yes') {
                // Show the parent info section and update labels
                document.getElementById('parent-info-label').style.display = 'block';
                document.getElementById('contact1Label').textContent = "Parent's Contact";
                document.getElementById('contact2Label').textContent = "Parent's Alternative Contact";
                document.getElementById('emailLabel').textContent = "Parent's Email";
                document.getElementById('contact1').setAttribute('placeholder', "Parent's Contact");
                document.getElementById('contact2').setAttribute('placeholder', "Parent's Alternative Contact");
                document.getElementById('email').setAttribute('placeholder', "Parent's Email");
            } else {
                // Hide the parent info section and revert labels
                document.getElementById('parent-info-label').style.display = 'none';
                document.getElementById('contact1Label').textContent = "Contact";
                document.getElementById('contact2Label').textContent = "Alternative Contact";
                document.getElementById('emailLabel').textContent = "Email";
                document.getElementById('contact1').setAttribute('placeholder', "Contact");
                document.getElementById('contact2').setAttribute('placeholder', "Alternative Contact");
                document.getElementById('email').setAttribute('placeholder', "Email");
            }
        });
    });
    


    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture form data
        const formData = new FormData(this);

        const selectedDonations = Array.from(document.querySelectorAll('input[name="donations"]:checked'))
        .map(checkbox => checkbox.value);
    
    const data = {
        registrationType: document.getElementById('registrationType').value,
        individualName: document.getElementById('individualName').value,
        teamName: document.getElementById('teamName').value,
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        division: document.getElementById('division').value,
        isChild: document.querySelector('input[name="isChild"]:checked') ? document.querySelector('input[name="isChild"]:checked').value : null,
        contact1: document.getElementById('contact1').value,
        contact2: document.getElementById('contact2').value,
        email: document.getElementById('email').value,
        donation: selectedDonations, // Use array of selected donations
    };

     // Get all player names if the registration type is "team"
     if (data.registrationType === 'team') {
        const playerNames = Array.from(document.querySelectorAll('.team-player')).map(input => input.value);
        data.players = playerNames;
    }

        // Send data to backend via POST request
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            window.location.href = "confirmation"; // Redirect to confirmation page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error with your registration. Please try again.');
        });

    });
});

