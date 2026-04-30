import smtplib
import os
from email.mime.text import MIMEText


def send_fire_alert(user_email, confidence):

    # Read credentials from environment variables
    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_PASS")

    subject = "🔥 Forest Fire Alert"

    body = f"""
⚠ ALERT!

Possible forest fire detected.

Confidence Level: {confidence:.2f}%

Please check the area immediately.

FLAME2-DT Detection System
"""

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = user_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(sender_email, sender_password)

        server.sendmail(sender_email, user_email, msg.as_string())

        server.quit()

        print("🔥 Fire alert email sent")

    except Exception as e:
        print("Email alert failed:", e)