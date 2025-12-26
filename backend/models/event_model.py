from models.user_model import db  # import the **same db instance**
# Note: don't import EventParticipant here

class Event(db.Model):
    __tablename__ = "event"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    organizer_name = db.Column(db.String(120), nullable=False) 
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    participants = db.relationship("EventParticipant", backref="event", cascade="all, delete-orphan")
