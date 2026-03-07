from fastapi import FastAPI
from fastapi.templating import Jinja2Templates

app = FastAPI()
@app.get("/")
def root():
    return {"messege":"hi"}
@app.get("/blackperson")
def re():
    return{"messege":"blackperson"}
@app.get("/bro")
def bro():
    return {"massege":"bro"}
@app.get("/product/{id}")
def bro(id:int):
    pro=["laptop","mobile","mouse"]
    return pro[id]