from flask import Flask, jsonify, request

from flask_cors import CORS, cross_origin

from flask_mongoengine import MongoEngine

app = Flask(__name__)

nasaAPI = "0UwQK04XRXD7U435LgFrOCH5gl826pclax1I87Gy"
auKm = 149597870

app.config["MONGODB_SETTINGS"] = {
    "db": "SpaceVacation",
    "host": "127.0.0.1",
    "port": 27017,
}
db = MongoEngine()
db.init_app(app)


class PlanetList(db.Document):
    Planet = db.StringField()
    SunDistanceAU = db.FloatField()
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
        planet = PlanetList.objects(Planet=selectedPlanet).first()
        au = planet.SunDistanceAU
        distanceFromEarth = abs(1 - au) * auKm
        drivingTime = round((distanceFromEarth / 120) / 24 / 365, 2)

        returnData = {
            "distanceFromEarth": distanceFromEarth,
            "drivingTime": drivingTime,
        }

        return jsonify(returnData)


def log(msg, emoji):
    print(emoji * 10)
    print(msg)
    print(emoji * 10)


if (__name__) == "__main__":
    app.run(port=9030, debug=True)
