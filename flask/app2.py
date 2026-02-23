from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST", "GET"])
def submit():
    if request.method == "POST":
        username = request.form.get("username")
        if username == "mj":
            return render_template("welcome.html")
        else:
            return "Wrong username"

    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)