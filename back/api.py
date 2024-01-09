from flask import Flask, jsonify, request
import json
import requests
import asyncio
from aiohttp import ClientSession
from flask_cors import CORS, cross_origin
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)

from flask_mongoengine import MongoEngine, Document

api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "pvEcVUmAS3xLckxI"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

NASA_API_URL = "https://api.nasa.gov/planetary/apod"
NASA_API_KEY = "0UwQK04XRXD7U435LgFrOCH5gl826pclax1I87Gy"
VOYAGER_SPEED = 61500
AU_IN_KM = 149597870
DRIVE_SPEED = 120
WALKING_SPEED = 5
LIGHT_SPEED = 1080000000  # km/h

api.config["MONGODB_SETTINGS"] = {
    "db": "SpaceVacation",
    "host": "127.0.0.1",
    "port": 27017,
}
db = MongoEngine()
db.init_app(api)


async def fetch_nasa_data(session):
    url = f"{NASA_API_URL}?api_key={NASA_API_KEY}&count=1"
    # print("🔭 nasa url" + url)
    async with session.get(url) as response:
        # return await response.json()
        return await response.json()


async def fetch_planet_images(session, planetName):
    url = f"https://images-api.nasa.gov/search?q={planetName}&media_type=image"
    log(url, "👯🏼‍♂️")
    async with session.get(url) as response:
        print(response)
        # return await response.json()


class PlanetList(db.Document):
    Planet = db.StringField()
    SunDistanceAU = db.FloatField()
    meta = {
        "collection": "PlanetDestinations",
        "allow_inheritance": False,
        "strict": False,
    }


class Planet(Document):
    Planet = db.StringField()
    SunDistanceAU = db.FloatField()
    meta = {"collection": "PlanetDestinations", "allow_inheritance": False}


@api.route("/api/list", methods=["GET"])
def list_planets():
    planets = sorted(list(PlanetList.objects), key=lambda x: x.SunDistanceAU)
    return jsonify(planets)


@api.route("/api/getNasaData", methods=["GET"])
async def get_npod():
    try:
        planets = sorted(list(PlanetList.objects), key=lambda x: x.SunDistanceAU)
        async with ClientSession() as session:
            apod = await fetch_nasa_data(session)
            data = {"apod": apod, "planets": PlanetList.objects}
            return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/api/getDistance", methods=["POST"])
async def calculate_distance():
    if request.method == "POST":
        data = request.get_json()
        selectedPlanet = data["selectedPlanet"]
        log(selectedPlanet, "🪐")
        planet = PlanetList.objects(Planet=selectedPlanet).first()
        au = planet.SunDistanceAU

        returnData = processDistances(au, selectedPlanet)

        # async with ClientSession() as session:
        #     images = await fetch_planet_images(session, planetName=str(selectedPlanet))

        # print(images)
        return jsonify(returnData)


@api.route("/api/deletePlanet", methods=["POST"])
@jwt_required()
def delete_planet():
    data = request.get_json()

    planetName = data["planetName"]

    planets = PlanetList.objects(Planet=planetName)

    selectedPlanet = planets.first()

    if not selectedPlanet:
        return jsonify({"error": "data not found"})
    else:
        selectedPlanet.delete()

    status_message = {
        "planetList": sorted(list(PlanetList.objects), key=lambda x: x.SunDistanceAU),
        "message": planetName + " has been deleted (ʘ‿ʘ)╯",
    }
    return jsonify(status_message)


@api.route("/api/addPlanet", methods=["POST"])
@jwt_required()
def create_planet():
    data = request.get_json()
    planetName = data["planetName"]
    au = data["au"]

    planet = Planet(Planet=planetName, SunDistanceAU=au)
    planet.save()
    status_message = {
        "planetList": sorted(list(PlanetList.objects), key=lambda x: x.SunDistanceAU),
        "message": "success",
    }
    return jsonify(status_message)


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@api.route("/api/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "joncoe@joncoe.com" or password != "space":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response


@api.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


def processDistances(au, selectedPlanet):
    distanceFromEarthAU = abs(1 - au)
    # * AU_IN_KM
    distanceFromEarthKM = abs(1 - au) * AU_IN_KM
    drivingTime = round((distanceFromEarthKM / DRIVE_SPEED) / 24 / 365, 2)
    voyagerTime = round((distanceFromEarthKM / VOYAGER_SPEED) / 24 / 365, 2)
    walkingTime = round((distanceFromEarthKM / WALKING_SPEED) / 24 / 365, 2)
    lightSpeedTime = round((distanceFromEarthKM / LIGHT_SPEED), 2)  # hours
    log(lightSpeedTime, "⚡")
    returnData = {
        "selectedPlanet": selectedPlanet,
        "distanceFromEarthAU": distanceFromEarthAU,
        "distanceFromEarthKM": distanceFromEarthKM,
        "drivingTime": drivingTime,
        "voyagerTime": voyagerTime,
        "walkingTime": walkingTime,
        "lightSpeedTime": lightSpeedTime,
        "au": au,
    }
    return returnData


def log(msg, emoji):
    print("\n")
    print(emoji * 10)
    print(msg)
    print(emoji * 10)
    print("\n")


if (__name__) == "__main__":
    api.run(port=5000, debug=True)
