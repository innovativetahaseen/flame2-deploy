"""
model.py

Defines the CNN/ResNet model architecture
used for Forest Fire classification.
Classes:
    0 -> Fire
    1 -> No Fire
"""
import torch.nn as nn
from torchvision import models

def get_model(num_classes):
    model = models.resnet18(weights=None)   # ← no download

    for param in model.parameters():
        param.requires_grad = False

    model.fc = nn.Linear(model.fc.in_features, num_classes)

    return model