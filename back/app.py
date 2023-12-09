from flask import Flask, jsonify, request
import json
import requests
import asyncio
from aiohttp import ClientSession
from flask_cors import CORS, cross_origin

from flask_mongoengine import MongoEngine

app = Flask(__name__)

NASA_API_URL = "https://api.nasa.gov/planetary/apod"
NASA_API_KEY = "0UwQK04XRXD7U435LgFrOCH5gl826pclax1I87Gy"
VOYAGER_SPEED = 61500
AU_IN_KM = 149597870
DRIVE_SPEED = 120
WALKING_SPEED = 5

app.config["MONGODB_SETTINGS"] = {
    "db": "SpaceVacation",
    "host": "127.0.0.1",
    "port": 27017,
}
db = MongoEngine()
db.init_app(app)


async def fetch_nasa_data(session):
    url = f"{NASA_API_URL}?api_key={NASA_API_KEY}&count=1"
    print("🔭 nasa url" + url)
    async with session.get(url) as response:
        # return await response.json()
        return await response.json()


class PlanetList(db.Document):
    Planet = db.StringField()
    SunDistanceAU = db.FloatField()
    meta = {
        "collection": "PlanetDestinations",
        "allow_inheritance": False,
        "strict": False,
    }


@app.route("/api/list", methods=["GET"])
def list_planets():
    return list(PlanetList.objects)


@app.route("/api/getNasaData", methods=["GET"])
async def get_npod():
    try:
        planets = list_planets()
        async with ClientSession() as session:
            apod = await fetch_nasa_data(session)
            data = {"apod": apod, "planets": PlanetList.objects}
            return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/getDistance", methods=["POST"])
def calculate_distance():
    if request.method == "POST":
        data = request.get_json()
        selectedPlanet = data["selectedPlanet"]
        log(selectedPlanet, "🪐")
        planet = PlanetList.objects(Planet=selectedPlanet).first()
        au = planet.SunDistanceAU
        distanceFromEarthAU = abs(1 - au)
        # * AU_IN_KM
        distanceFromEarthKM = abs(1 - au) * AU_IN_KM
        drivingTime = round((distanceFromEarthKM / DRIVE_SPEED) / 24 / 365, 2)
        voyagerTime = round((distanceFromEarthKM / VOYAGER_SPEED) / 24 / 365, 2)
        walkingTime = round((distanceFromEarthKM / WALKING_SPEED) / 24 / 365, 2)

        returnData = {
            "distanceFromEarthAU": distanceFromEarthAU,
            "distanceFromEarthKM": distanceFromEarthKM,
            "drivingTime": drivingTime,
            "voyagerTime": voyagerTime,
            "walkingTime": walkingTime,
            "au": au,
        }

        return jsonify(returnData)


def log(msg, emoji):
    print(emoji * 10)
    print(msg)
    print(emoji * 10)


if (__name__) == "__main__":
    app.run(port=9030, debug=True)
