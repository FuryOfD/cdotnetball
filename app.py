from flask import Flask, render_template, request, jsonify
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/register')
def register_page():
    return render_template('register.html')

@app.route('/confirmation')
def confirmation_page():
    return render_template('confirmation.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    elif request.method == 'POST':
        data = request.json  # Get the data from the POST request

        # Determine registration type and write to CSV accordingly
        with open('registrations.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            if data['registrationType'] == 'team':
                writer.writerow([data['firstname'], data['lastname'], data['email'], data['teamName']])
            else:
                writer.writerow([data['firstname'], data['lastname'], data['email'], data['individualName']])

        return jsonify({'message': 'Registration successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
