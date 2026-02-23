from flask import Flask, request,redirect,url_for

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask working!"


@app.route("/form", methods=["POST", "GET"])
def form():
    if request.method == "POST":
        username=request.form.get("username")
        if(username=="mj"):
            return redirect(url_for("hi"))
    
    return '''
<h2>hello<h2>
<form method="GET">
<input type="text" name="username"> </form>
'''
@app.route("/hi")
def hi():
    return "hi"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)