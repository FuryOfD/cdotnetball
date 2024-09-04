from flask import Flask, render_template, request, jsonify
import csv
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/register', methods=['GET'])
def register_page():
    return render_template('register.html')

@app.route('/confirmation')
def confirmation_page():
    return render_template('confirmation.html')

@app.route('/info')
def info_page():
    return render_template('info.html')

@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()  # Get the JSON data from the POST request

        # Print the data for debugging
        print(data)

        # Determine registration type and write to CSV accordingly
        try:
            with open('registrations.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                if data['registrationType'] == 'team':
                    writer.writerow(['TEAM-' + data['teamName'], data['division'], data['firstname'], data['lastname'], data['email']])
                else:
                    writer.writerow(['INDV-' + data['individualName'], data['division'], data['firstname'], data['lastname'], data['email']])
            
            return jsonify({'message': 'Registration successful'}), 200
        except Exception as e:
            print(f"Error writing to CSV: {e}")
            return jsonify({'message': 'Internal server error'}), 500
    else:
        return jsonify({'message': 'Invalid content type'}), 415  # 415 Unsupported Media Type


# Define the WSGI application function
def application(environ, start_response):
    """
    WSGI entry point. This function is called by the WSGI server.
    """
    # Call the Flask app as the WSGI application
    return app(environ, start_response)

if __name__ == '__main__':
    # Use the WSGI application for development when running directly
    app.run(debug=True)