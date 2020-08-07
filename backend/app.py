from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Customer(db.Model):
    __tablename__ = 'customer'

    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer)
    name = db.Column(db.String())
    country = db.Column(db.String())
    stair_id = db.Column(db.Integer())

    def __init__(self, age, name, country, stair_id):
        self.age = age
        self.name = name
        self.country = country
        self.stair_id = stair_id

    def serialize(self):
        return {
                'id': self.id, 
                'age': self.age,
                'name': self.name,
                'country': self.country,
                'stair_id': self.stair_id
        }

@app.route("/")
def hello():
    return "acorn microsite server"

@app.route("/add", methods=["POST"])
def add():
    data = request.json
    print(data)
    cust = Customer(data['age'], data['name'], data['country'], data['stair_id'])
    db.session.add(cust)
    db.session.commit()
    return "success", 200

@app.route("/remove", methods=["POST"])
def remove():
    data = request.json
    Customer.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return "success", 200

@app.route("/get_all")
def get_all():
    print("..getting all customers")
    data = Customer.query.all()
    return jsonify([c.serialize() for c in data])

if __name__ == '__main__':
    app.run()