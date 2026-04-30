import os
import sys
import threading
import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms

# ---------------------------------------------------
# Project root path
# ---------------------------------------------------
ROOT_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../")
)

sys.path.append(ROOT_DIR)

# Import model builder
from ml.model import get_model


# ---------------------------------------------------
# Model path
# ---------------------------------------------------
MODEL_PATH = os.path.join(ROOT_DIR, "fire_model.pth")


# ---------------------------------------------------
# Image preprocessing (must match training)
# ---------------------------------------------------
_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])


# ---------------------------------------------------
# Global model instance (lazy loaded)
# ---------------------------------------------------
_model = None
_model_lock = threading.Lock()

_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# ---------------------------------------------------
# Load model only once (thread-safe)
# ---------------------------------------------------
def _load_model():
    global _model

    with _model_lock:
        if _model is None:

            model = get_model(num_classes=2)

            if os.path.exists(MODEL_PATH):
                state = torch.load(MODEL_PATH, map_location=_device)
                model.load_state_dict(state)

            model.to(_device)
            model.eval()

            _model = model

    return _model


# ---------------------------------------------------
# Predict from tensor
# ---------------------------------------------------
def _predict_tensor(tensor):

    model = _load_model()

    tensor = tensor.to(_device)

    with torch.no_grad():
        output = model(tensor.unsqueeze(0))
        probs = F.softmax(output, dim=1)

        confidence, pred = torch.max(probs, 1)

    classes = ["fire", "nofire"]

    is_fire = classes[pred.item()] == "fire"

    return {
        "fire_detected": is_fire,
        "confidence": float(confidence.item())
    }


# ---------------------------------------------------
# Public API used by Flask
# ---------------------------------------------------
def run_detection(rgb_path, thermal_path=None):
    """
    rgb_path: path to RGB image
    thermal_path: optional thermal image
    """

    # Load RGB image
    img = Image.open(rgb_path).convert("RGB")

    tensor = _transform(img)

    result = _predict_tensor(tensor)

    # Extra debug info (optional)
    result["rgb_used"] = True
    result["thermal_used"] = thermal_path is not None

    return result