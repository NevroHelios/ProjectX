from flask import Flask, render_template, request, redirect, url_for, session

# Command to start the server
# flask run --debug --port 9420

# Create app instance of Flask
app = Flask(__name__)

# Create a route for the home page
@app.route('/')
def home():
    return render_template('index.html')


# run the app
if __name__ == "__main__":
    app.run(debug=True)