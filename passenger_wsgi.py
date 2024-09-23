from flask import Flask, render_template, request, jsonify
import csv
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

application = Flask(__name__)

@application.after_request
def set_charset(response):
    response.headers["Content-Type"] = "text/html; charset=utf-8"
    return response

@application.route('/')
def index():
    return render_template('home.html')

# application.route('/header')
# def header():
#     return render_template('header.html')

@application.route('/home')
def home_page():
    return render_template('home.html')

@application.route('/register')
def register_page():
    return render_template('register.html')

@application.route('/clothes')
def clothes_page():
    return render_template('kit.html')

@application.route('/confirmation')
def confirmation_page():
    return render_template('confirmation.html')

@application.route('/info')
def info_page():
    return render_template('info.html')

@application.route('/register', methods=['POST'])
def register():
    try:
        if request.is_json:
            data = request.get_json()  # Get the JSON data from the POST request

            # Print the data for debugging
            print(data)

            # Determine registration type and write to CSV accordingly
            with open('registrations.csv', mode='a', newline='', encoding="utf-8") as file:
                writer = csv.writer(file)

                if data['registrationType'] == 'team':
                    # Join the player names into a single string
                    player_names = ', '.join(data.get('players', []))

                    # Write team registration details along with player names
                    writer.writerow([
                        'TEAM-' + data['teamName'],
                        data['teamCap'],
                        player_names,  # Team name
                        data['division'],            # Division
                        data['isChild'],  
                        data['contactName'], # Is child or not
                        data['contact1'],            # Contact 1
                        data['contact2'],            # Contact 2
                        data['email'],               # Email
                        ', '.join(data['donation']),
                        data['donationDetails'], # Donations
                    ])
                else:
                    # Individual registration
                    writer.writerow([
                        'INDIVIDUAL-' + data['individualName'],  # Individual name
                        data['division'],                        # Division
                        data['isChild'],   
                        data['contactName'],# Is child or not
                        data['contact1'],                        # Contact 1
                        data['contact2'],                        # Contact 2
                        data['email'],                           # Email
                        ', '.join(data['donation']),
                        data['donationDetails'],              # Donations
                    ])
                return jsonify({'message': 'Registration successful'}), 200
        else:
            return jsonify({'message': 'Invalid content type'}), 415  # 415 Unsupported Media Type
    except Exception as e:
        # Log the error
        print(f"Error: {e}", file=sys.stderr)
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500
    
if __name__ == '__main__':
    # Use the WSGI application for development when running directly
    application.run(debug=True)
