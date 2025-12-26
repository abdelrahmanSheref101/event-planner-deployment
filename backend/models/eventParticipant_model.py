from models.user_model import db, User
from enums.event_role_enum import EventRole
from enums.attendance_status_enum import AttendanceStatus
from models.event_model import Event  # import **after db** is same instance

class EventParticipant(db.Model):
    __tablename__ = "event_participant"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)
    event_name = db.Column(db.String(120), nullable=True)
    role = db.Column(db.Enum(EventRole), default=EventRole.ATTENDEE, nullable=False)
    attendance_status = db.Column(db.Enum(AttendanceStatus), default=AttendanceStatus.MAYBE, nullable=False)

    user = db.relationship("User", backref=db.backref("events", lazy="dynamic"))
