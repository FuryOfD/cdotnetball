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
    newPlayer.innerHTML = `<input placeholder="Player ${playerCount} Name & Surname" type="text" class="input team-player" />`;
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
          const teamCapLabel = document.getElementById("teamCapLabel");

          if (this.value === "individual") {
            individualNameLabel.style.display = "block";
            teamNameLabel.style.display = "none";
            document.getElementById("individualName").required = true;
            document.getElementById("teamName").required = false;
          } else if (this.value === "team") {
            individualNameLabel.style.display = "none";
            teamNameLabel.style.display = "block";
            teamCapLabel.style.display = "block";
            document.getElementById("individualName").required = false;
            document.getElementById("teamName").required = true;
            document.getElementById("teamCap").required = true;

          } else {
            individualNameLabel.style.display = "none";
            teamNameLabel.style.display = "none";
            document.getElementById("individualName").required = false;
            document.getElementById("teamName").required = false;
            document.getElementById("teamCap").required = false;
          }
        });

    document.querySelectorAll('input[name="isChild"]').forEach((elem) => {
        elem.addEventListener('change', function(event) {
            if (event.target.value === 'yes') {
                // Show the parent info section and update labels
                document.getElementById('parent-info-label').style.display = 'block';

                document.getElementById('contact1Label').textContent = "Parent/Gaurdian's Contact";
                document.getElementById('contact2Label').textContent = "Parent/Gaurdian's Alternative Contact";
                document.getElementById('emailLabel').textContent = "Parent/Gaurdian's Email";
                document.getElementById('contactNamelabel').textContent = "Team Enroller's Full Name";
                
                // document.getElementById('contact1').setAttribute('placeholder', "Parent/Gaurdian's Contact");
                // document.getElementById('contact2').setAttribute('placeholder', "Parent/Gaurdian's Alternative Contact");
                // document.getElementById('email').setAttribute('placeholder', "Parent/Gaurdian's Email");
                
            } else {
                // Hide the parent info section and revert labels
                document.getElementById('parent-info-label').style.display = 'none';
                document.getElementById('contact1Label').textContent = "Contact Number";
                document.getElementById('contact2Label').textContent = "Alternative Contact Number";
                document.getElementById('emailLabel').textContent = "Email";
                document.getElementById('contactNamelabel').textContent = "Name & Surname";
                // document.getElementById('contact1').setAttribute('placeholder', "Contact");
                // document.getElementById('contact2').setAttribute('placeholder', "Alterndddative Contact");
                // document.getElementById('email').setAttribute('placeholder', "Email");
            }
        });
    });

    // Listen for Donation Amount checkbox
    document.getElementById('donationAmount').addEventListener('change', function() {
        const donationAmountInput = document.getElementById('donationAmountInput');
        if (this.checked) {
            donationAmountInput.style.display = 'block';
        } else {
            donationAmountInput.style.display = 'none';
        }
    });

    // Listen for Equipment checkbox
    document.getElementById('donationEquipment').addEventListener('change', function() {
        const donationEquipmentInput = document.getElementById('donationEquipmentInput');
        if (this.checked) {
            donationEquipmentInput.style.display = 'block';
        } else {
            donationEquipmentInput.style.display = 'none';
        }
    });

    // Listen for Prize checkbox
    document.getElementById('donationPrize').addEventListener('change', function() {
        const donationPrizeInput = document.getElementById('donationPrizeInput');
        if (this.checked) {
            donationPrizeInput.style.display = 'block';
        } else {
            donationPrizeInput.style.display = 'none';
        }
    });

    // Listen for Hampers checkbox
    document.getElementById('donationHampers').addEventListener('change', function() {
        const donationHampersInput = document.getElementById('donationHampersInput');
        if (this.checked) {
            donationHampersInput.style.display = 'block';
        } else {
            donationHampersInput.style.display = 'none';
        }
    });

    // Listen for Water checkbox
    document.getElementById('donationWater').addEventListener('change', function() {
        const donationWaterInput = document.getElementById('donationWaterInput');
        if (this.checked) {
            donationWaterInput.style.display = 'block';
        } else {
            donationWaterInput.style.display = 'none';
        }
    });

    // Listen for Goodybags checkbox
    document.getElementById('donationGoodybags').addEventListener('change', function() {
        const donationGoodybagsInput = document.getElementById('donationGoodybagsInput');
        if (this.checked) {
            donationGoodybagsInput.style.display = 'block';
        } else {
            donationGoodybagsInput.style.display = 'none';
        }
    });




    


    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Capture form data for donations
        const selectedDonations = Array.from(document.querySelectorAll('input[name="donations"]:checked'))
            .map(checkbox => checkbox.value);
    
        let donationDetails = {};
        if (document.getElementById('donationAmount').checked) {
            donationDetails.amount = document.getElementById('donationAmountValue').value;
        }
        if (document.getElementById('donationEquipment').checked) {
            donationDetails.equipment = document.getElementById('donationEquipmentValue').value;
        }
        if (document.getElementById('donationPrize').checked) {
            donationDetails.prize = document.getElementById('donationPrizeValue').value;
        }
        if (document.getElementById('donationHampers').checked) {
            donationDetails.hampers = document.getElementById('donationHampersValue').value;
        }
        if (document.getElementById('donationWater').checked) {
            donationDetails.water = document.getElementById('donationWaterValue').value;
        }
        if (document.getElementById('donationGoodybags').checked) {
            donationDetails.goodbags = document.getElementById('donationGoodybagsValue').value;
        }
    
        // Validation
        const namePattern = /^[\p{L}\p{M}\p{Zs}.'-]+$/u;
        
        const isNameValid = namePattern.test(document.getElementById('individualName').value);
        const isTeamNameValid = namePattern.test(document.getElementById('teamName').value);
        const isTeamCapValid = namePattern.test(document.getElementById('teamCap').value);
        const isContactNameValid = namePattern.test(document.getElementById('contactName').value);
        const isTeamPlayersValid = Array.from(document.querySelectorAll('.team-player')).every(input => namePattern.test(input.value));
    
        const registrationType = document.getElementById('registrationType').value;
        if (registrationType === 'team') {  
            if (!isTeamNameValid) {
                alert("Please enter a valid team name with only letters, spaces, hyphens, and apostrophes.");
                return; // Stop submission
            }
        
            if (!isTeamCapValid) {
                alert("Please enter a valid team captain name with only letters, spaces, hyphens, and apostrophes.");
                return; // Stop submission
            }
            if (!isTeamPlayersValid) {
                alert("Please enter valid names for all team players.");
                return; // Stop submission
            }
        }
        else{
            if (!isNameValid) {
                alert("Please enter a valid individual name with only letters, spaces, hyphens, and apostrophes.");
                return; // Stop submission
            }

        }

        // Check for validation errors
        
    
        if (!isContactNameValid) {
            alert("Please enter a valid contact name with only letters, spaces, hyphens, and apostrophes.");
            return; // Stop submission
        }
    
        
    
        // If validation passes, continue with form data collection
        const data = {
            registrationType: document.getElementById('registrationType').value,
            individualName: document.getElementById('individualName').value,
            teamName: document.getElementById('teamName').value,
            teamCap : document.getElementById('teamCap').value,
            division: document.getElementById('division').value,
            isChild: document.querySelector('input[name="isChild"]:checked') ? document.querySelector('input[name="isChild"]:checked').value : null,
            contactName: document.getElementById('contactName').value,
            contact1: document.getElementById('contact1').value,
            contact2: document.getElementById('contact2').value,
            email: document.getElementById('email').value,
            donation: selectedDonations,
            donationDetails: donationDetails
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

