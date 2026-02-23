from flask import Flask,render_template,request
import pickle
import numpy as np
app=Flask(__name__)
with open("model2.pkl","rb") as file:
    model=pickle.load(file)

@app.route("/")
def home():
    return render_template("index.html")
@app.route("/predict",methods=["GET","POST"])
def process():
    value=[int(x) for x in request.form.values()]
    final = [np.array(value)]
    prediction = model.predict(final)
    output = 'pass' if prediction[0] == 1 else 'fail'

    return render_template('index.html', prediction_text='Prediction: {}'.format(output))

if __name__ == "__main__":
    app.run(debug=True)

