from flask import Flask

# Create a Flask app instance
app = Flask(__name__)

# Define a route for the root URL ('/')
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Run the app if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)