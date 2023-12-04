from flask import Flask, jsonify, request

# from flask_cors import CORS, cross_origin

from flask_mongoengine import MongoEngine

app = Flask(__name__)

app.config["MONGODB_SETTINGS"] = {
    "db": "SpaceVacation",
    "host": "127.0.0.1",
    "port": 27017,
}
db = MongoEngine()
db.init_app(app)


class Planets(db.Document):
    Planet = db.StringField()
    SunDistanceAU = db.IntField()
    meta = {"collection": "PlanetDestinations", "allow_inheritance": False}


@app.route("/list", methods=["GET"])
# @cross_origin(supports_credentials=True)
def list_planets():
    print(db)
    print("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀")
    data = list(Planets.objects)
    return jsonify(data)


if (__name__) == "__main__":
    app.run(port=9030, debug=True)
