from flask import Blueprint, request, jsonify, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.ml_service import run_detection
from app.services.alert_service import send_fire_alert
from app.models.user import User

import os
import uuid
import time
from werkzeug.utils import secure_filename

detection_bp = Blueprint('detection', __name__)
ALERT_COOLDOWN = 30  # 5 minutes cooldown
last_alert_time = 0  # Timestamp of last alert sent

# 🔥 Fire Detection API (PROTECTED)
@detection_bp.route("/api/detect", methods=["POST"])
@jwt_required()
def detect_fire():

    global last_alert_time

    # 🔑 Get logged-in user
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # 📷 Get uploaded images
    rgb = request.files.get("rgb_image")
    thermal = request.files.get("thermal_image")

    if not rgb or not thermal:
        return jsonify({"error": "Both RGB and Thermal images required"}), 400

    # 📁 Upload folder
    uploads_dir = os.path.join(os.getcwd(), "uploads")
    os.makedirs(uploads_dir, exist_ok=True)

    # 🆔 Unique filenames
    rgb_filename = str(uuid.uuid4()) + "_" + secure_filename(rgb.filename)
    thermal_filename = str(uuid.uuid4()) + "_" + secure_filename(thermal.filename)

    rgb_path = os.path.join(uploads_dir, rgb_filename)
    thermal_path = os.path.join(uploads_dir, thermal_filename)

    # 💾 Save images
    rgb.save(rgb_path)
    thermal.save(thermal_path)

    # 🤖 Run ML detection
    result = run_detection(rgb_path, thermal_path)

    print("🔥 DETECTION RESULT:", result)

    # 🚨 ALERT SYSTEM
    try:
        confidence = result.get("confidence", 0)
        confidence_percent = confidence * 100

        if confidence > 0.5 and user:

            current_time = time.time()

            # ⏱ Cooldown check
            if current_time - last_alert_time > ALERT_COOLDOWN:

                print("🚨 ALERT TRIGGERED - sending email")

                send_fire_alert(user.email, confidence_percent)

                last_alert_time = current_time

                print("📧 Alert sent to:", user.email)

            else:
                print("⏱ Alert skipped (cooldown active)")

    except Exception as e:
        print("❌ Alert error:", e)

    return jsonify(result), 200


# ❤️ Health Check
@detection_bp.route("/api/health")
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Backend running successfully"
    }), 200