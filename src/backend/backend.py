from flask import Flask, request, abort, Response, redirect, jsonify
from flask_cors import CORS, cross_origin
from datetime import datetime
from .sms import *
import re
import peewee
from .db import * # Import after app is defined

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')

print("#####################")
print("# APP CONFIGURATION #")
print("#####################")
for k in app.config:
    print(f"{k}={app.config[k]}")

CORS(app, origin=app.config["CORS_ORIGIN"])


@app.route("/user/create", methods=["POST", "GET"])
@cross_origin()
def user_create():
    payload = request.get_json(force=True)

    phone, room_hash = payload.get("phone"), payload.get("room")
    if not phone or not room_hash:
        abort(400)

    room = Room.get_or_none(hash=room_hash)
    if not room:
        print("Room not found: %s" % room_hash)
        abort(404)

    # todo: verify phone number
    cleaned_phone = re.sub('[^\\d+]', '', phone)

    user = User.create(phone=cleaned_phone, room=room)

    check_url = f"http://{app.config['HOSTNAME']}/#{user.hash}"
    user_welcome_text = f"Sie wurden in die Warteschlange aufgenommen. Den aktuellen Status finden sie unter {check_url}."

    do_send_sms(phone, user_welcome_text)
    return jsonify(user_hash=str(user.hash))


@app.route("/user/<user_hash>")
@cross_origin()
def get_user(user_hash):
    user = User.get_or_none(hash=user_hash)
    if not user:
        abort(404)
    return jsonify({"hash": user_hash, "phone": user.phone,
                    "room": user.room.hash})


@app.route("/user/<user_hash>/call", methods=["POST", "GET"])
@cross_origin()
def call_user(user_hash):
    user = User.get_or_none(hash=user_hash)
    if not user:
        abort(404)

    notify_text = "Hello, you have been called"

    if do_send_sms(user.phone, notify_text):
        return jsonify({"success": "sent"})
    else:
        return jsonify({"success": "smserror"})


@app.route("/room/create", methods=["POST", "GET"])
@cross_origin()
def create_room():
    room_uuid = do_create_room()
    return jsonify({"room_hash": room_uuid})


def do_create_room():
    room = Room.create()
    return room.hash


# for debugging
@app.route("/smslog")
def get_smslog():
    with open("smslog.txt", "r") as f:
        return Response(f.read(), mimetype="text/plain")
