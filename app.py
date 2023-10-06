from flask import Flask, render_template, request, redirect, url_for, session

# Create app instance of Flask
app = Flask(__name__)


# Create a route for the home page
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/')
def greet():
    return render_template('greet.html')


# run the app
if __name__ == "__main__":
    app.run(debug=True)

