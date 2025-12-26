import enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class UserRole(enum.Enum):
    USER = "user"
    ADMIN = "admin"
