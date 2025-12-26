import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.event_model import db, Event
from models.eventParticipant_model import EventParticipant, EventRole
from models.user_model import User
from enums.attendance_status_enum import AttendanceStatus

event_bp = Blueprint("event_bp", __name__)


@event_bp.route('/create_event', methods=['POST'])
@jwt_required()
def create_event():
    from flask import request, jsonify
    from flask_jwt_extended import get_jwt_identity
    
    current_user = get_jwt_identity()
    
    if isinstance(current_user, str):
        current_user = json.loads(current_user)

    current_user_id = current_user['id']
    organizers_name=current_user['Name']
    data = request.json
    try:
        new_event = Event(
            title=data['title'],
            date=data['date'],
            time=data['time'],
            location=data['location'],
            description=data.get('description'),
            organizer_name=organizers_name,
            organizer_id=current_user_id,
        )
        db.session.add(new_event)
        db.session.commit()

        organizer = EventParticipant(
            user_id=current_user_id,
            event_id=new_event.id,
            event_name=new_event.title,
            role=EventRole.ORGANIZER,
            attendance_status=AttendanceStatus.GOING
        )
        db.session.add(organizer)
        db.session.commit()

        return jsonify({"message": "Event created successfully", "event_id": new_event.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to create event: {str(e)}"}), 500


@event_bp.route('/my_events', methods=['GET'])
@jwt_required()
def my_events():
    current_user = get_jwt_identity()
    
    if isinstance(current_user, str):
        current_user = json.loads(current_user)
        
    events = Event.query.join(EventParticipant).filter(
        EventParticipant.user_id == current_user['id'],
        EventParticipant.role == EventRole.ORGANIZER
    ).all()

    result = []
    for e in events:
        result.append({
            "id": e.id,
            "title": e.title,
            "date": str(e.date),
            "time": str(e.time),
            "location": e.location,
            "description": e.description
        })
    return jsonify(result), 200

@event_bp.route('/my_invited_events', methods=['GET'])
@jwt_required()
def invited_events():
    current_user = get_jwt_identity()
    
    if isinstance(current_user, str):
        current_user = json.loads(current_user)
    
    events = Event.query.join(EventParticipant).filter(
        EventParticipant.user_id == current_user['id'],
        EventParticipant.role == EventRole.ATTENDEE
    ).all()

    result = []
    for e in events:
        result.append({
            "id": e.id,
            "title": e.title,
            "date": str(e.date),
            "time": str(e.time),
            "location": e.location,
            "description": e.description,
            "organizer_name": e.organizer_name,
        })
    return jsonify(result), 200

@event_bp.route('/<int:event_id>/invite', methods=['POST'])
@jwt_required()
def invite_user(event_id):
    event = Event.query.get(event_id)
    current_user = get_jwt_identity()
    if isinstance(current_user, str):
        current_user = json.loads(current_user)

    data = request.json
    user_to_invite = User.query.filter_by(email=data['email']).first()
    if not user_to_invite:
        return jsonify({"error": "User not found"}), 404

    if event.organizer_id != current_user['id']:
        return jsonify({
            "error": "Only organizers can invite",
            "organizername": event.organizer_name,
            "userName": current_user['Name']
        }), 403

    if EventParticipant.query.filter_by(event_id=event_id, user_id=user_to_invite.id).first():
        return jsonify({"error": "User already invited"}), 400

    participant = EventParticipant(
        user_id=user_to_invite.id,
        event_id=event_id,
        event_name=event.title,
        role=EventRole.ATTENDEE
    )
    db.session.add(participant)
    db.session.commit()

    return jsonify({"message": f"{user_to_invite.Name} invited successfully"}), 200


@event_bp.route('/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    current_user = get_jwt_identity()
    if isinstance(current_user, str):
        current_user = json.loads(current_user)

    organizer = EventParticipant.query.filter_by(
        event_id=event_id,
        user_id=current_user['id'],
        role=EventRole.ORGANIZER
    ).first()
    if not organizer:
        return jsonify({"error": "Only event organizers can delete the event"}), 403

    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404

    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted successfully"}), 200

@event_bp.route('/<int:event_id>/respond', methods=['POST'])
@jwt_required()
def respond_event(event_id):
    current_user = get_jwt_identity()
    if isinstance(current_user,str):
        current_user=json.loads(current_user)
        
    data = request.json
    status = data.get('status')

    if status not in [s.value for s in AttendanceStatus]:
        return jsonify({"error": "Invalid status"}), 400

    participant = EventParticipant.query.filter_by(
        event_id=event_id,
        user_id=current_user['id']
    ).first()
    if not participant:
        return jsonify({"error": "You are not a participant of this event"}), 403

    participant.attendance_status = AttendanceStatus(status)
    db.session.commit()
    return jsonify({"message": f"Attendance status updated to {status}"}), 200

@event_bp.route('/<int:event_id>/participants', methods=['GET'])
@jwt_required()
def get_participants(event_id):
    current_user = get_jwt_identity()
    if isinstance(current_user,str):
        current_user=json.loads(current_user)
        
    organizer = EventParticipant.query.filter_by(
        event_id=event_id,
        user_id=current_user['id'],
        role=EventRole.ORGANIZER
    ).first()
    if not organizer:
        return jsonify({"error": "Only organizers can view participants"}), 403

    participants = EventParticipant.query.filter_by(event_id=event_id).all()
    result = []
    for p in participants:
        result.append({
            "user_id": p.user_id,
            "name": p.user.Name,
            "role": p.role.value,
            "attendance_status": p.attendance_status.value
        })
    return jsonify(result), 200

@event_bp.route('/search', methods=['POST'])
@jwt_required()
def search_events():
    current_user = get_jwt_identity()
    if isinstance(current_user, str):
        current_user = json.loads(current_user)

    data = request.json or {}
    query_text = data.get('query', '').strip()

    if not query_text:
        return jsonify({"error": "Query is required"}), 400

    events = Event.query.join(EventParticipant).filter(
        EventParticipant.user_id == current_user['id'],
        (Event.title.ilike(f"%{query_text}%")) |
        (Event.location.ilike(f"%{query_text}%")) |
        (Event.description.ilike(f"%{query_text}%"))
    ).all()

    result = []
    for e in events:
        result.append({
            "id": e.id,
            "title": e.title,
            "date": str(e.date),
            "time": str(e.time),
            "location": e.location,
            "description": e.description
        })

    return jsonify(result), 200

    