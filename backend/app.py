from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config

from models.user_model import db, bcrypt
from models.event_model import Event
from models.eventParticipant_model import EventParticipant

from routes.auth_routes import auth_bp
from routes.events_routes import event_bp

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(event_bp, url_prefix="/api/events")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
