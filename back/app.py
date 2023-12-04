from flask import Flask, jsonify, request

from flask_cors import CORS, cross_origin

from flask_mongoengine import MongoEngine

app = Flask(__name__)

auKm = 149597870.7

app.config["MONGODB_SETTINGS"] = {
    "db": "SpaceVacation",
    "host": "127.0.0.1",
    "port": 27017,
}
db = MongoEngine()
db.init_app(app)


class PlanetList(db.Document):
    Planet = db.StringField()
    # SunDistanceAU = db.DecimalField()
    meta = {
        "collection": "PlanetDestinations",
        "allow_inheritance": False,
        "strict": False,
    }


@app.route("/api/list", methods=["GET"])
@cross_origin(origin="*")
def list_planets():
    print(db)
    log("connected", "🚀")
    data = list(PlanetList.objects)
    return jsonify(data)


@app.route("/api/getDistance", methods=["POST"])
@cross_origin(origin="*")
def calculate_distance():
    if request.method == "POST":
        data = request.get_json()
        selectedPlanet = data["selectedPlanet"]

        log(selectedPlanet, "🪐")
        return jsonify(data)


def log(msg, emoji):
    print(emoji * 10)
    print(msg)
    print(emoji * 10)


if (__name__) == "__main__":
    app.run(port=9030, debug=True)
