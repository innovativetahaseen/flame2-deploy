from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

from app import create_app

app = create_app()

if __name__ == "__main__":
    # Bind to the port that Render provides or default to 10000
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port, debug=True)