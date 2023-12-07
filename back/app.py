from flask import Flask, jsonify, request
import requests
import asyncio
from aiohttp import ClientSession
from flask_cors import CORS, cross_origin

from flask_mongoengine import MongoEngine

app = Flask(__name__)

NASA_API_URL = "https://api.nasa.gov/planetary/apod"
NASA_API_KEY = "0UwQK04XRXD7U435LgFrOCH5gl826pclax1I87Gy"
# NASA_key = "https://api.nasa.gov/planetary/apod?api_key=IrY00RmqYh7DCJf8EhSWfNtfFDqmuFiR9TEcn4nJ&count=1"
AU_IN_KM = 149597870

app.config["MONGODB_SETTINGS"] = {
    "db": "SpaceVacation",
    "host": "127.0.0.1",
    "port": 27017,
}
db = MongoEngine()
db.init_app(app)


async def fetch_nasa_data(session):
    url = f"{NASA_API_URL}?api_key={NASA_API_KEY}"
    async with session.get(url) as response:
        return await response.json()


class PlanetList(db.Document):
    Planet = db.StringField()
    SunDistanceAU = db.FloatField()
    meta = {
        "collection": "PlanetDestinations",
        "allow_inheritance": False,
        "strict": False,
    }


# @app.route("/api/list", methods=["GET"])
# @cross_origin(origin="*")
def list_planets():
    # print(db)
    log("connected", "🚀")
    return list(PlanetList.objects)
    # planets = {"planets": data}
    # return jsonify(planets)


@app.route("/api/getNasaData", methods=["GET"])
async def get_nasa_data():
    try:
        planets = list_planets()
        async with ClientSession() as session:
            # Fetch data asynchronously
            apod = await fetch_nasa_data(session)
            data = {"planets": planets, "apod": apod}
            return jsonify(data)  # Sending JSON response back to the user

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/getInfo", methods=["GET"])
@cross_origin(origin="*")
async def init_site_info():
    # apod = get_nasa_data()

    pass
    # # log("getInfo", "🚀")
    # # data = {"planets": list(PlanetList.objects)}

    # log("connected", "🚀")
    # # data = list(PlanetList.objects)
    # # print(data)
    # dump(data)
    # return jsonify(data)


@app.route("/api/getDistance", methods=["POST"])
@cross_origin(origin="*")
def calculate_distance():
    if request.method == "POST":
        data = request.get_json()
        selectedPlanet = data["selectedPlanet"]
        log(selectedPlanet, "🪐")
        planet = PlanetList.objects(Planet=selectedPlanet).first()
        au = planet.SunDistanceAU
        distanceFromEarth = abs(1 - au) * AU_IN_KM
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
