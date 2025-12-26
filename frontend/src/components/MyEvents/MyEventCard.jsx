import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarDays,
  faCircleInfo,
  faLocationDot,
  faPlus,
  faRemove,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import InviteEvent from "./InviteEvent";
import Participants from "./Participants";
export default function EventCard({ event, onDelete }) {
  const [showInvite, setShowInvite] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const handleInviteVisibility = () => {
    setShowInvite(false);
  };
  const handleParticipantsVisibility = () => {
    setShowInvite(false);
  };

  return (
    <div
      key={event.id}
      className="card p-4 bg-white m-4 rounded-2xl shadow-lg hover:shadow-xl duration-200 text-gray-700"
    >
      <h2 className="text-2xl text-center md:text-left font-bold">
        {event.title}
      </h2>
      <div className="border w-full border-black my-4"></div>
      <p className="mb-2 flex gap-2 items-center">
        <FontAwesomeIcon icon={faLocationDot} />
        {event.location}
      </p>
      {event.description && (
        <p className="mb-2 flex gap-2 items-center">
          <FontAwesomeIcon icon={faCircleInfo} />
          {event.description}
        </p>
      )}
      <div className="justify-between md:flex">
        <div className="flex md:my-0 my-2 gap-4">
          <p className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendarDays} />
            {event.date}
          </p>
          <p className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClockFour} />
            {event.time}
          </p>
        </div>
        <div className="flex md:my-0 my-2 flex-col md:flex-row">
          <span
            onClick={() => setShowParticipants(true)}
            className="px-4 rounded-lg py-1 bg-green-500 hover:bg-green-600 duration-200 text-white cursor-pointer text-center my-2 md:my-0 md:ml-2"
          >
            <FontAwesomeIcon icon={faUserGroup} /> View Participants
          </span>
          <span
            onClick={() => setShowInvite(true)}
            className="px-4 rounded-lg py-1 bg-blue-500 hover:bg-blue-600 duration-200 text-white cursor-pointer text-center my-2 md:my-0 md:ml-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Invite by email
          </span>
          <span
            onClick={() => onDelete(event.id)}
            className="px-4 rounded-lg py-1 bg-red-700 hover:bg-red-800 duration-200 text-white cursor-pointer text-center my-2 md:my-0 md:ml-2"
          >
            <FontAwesomeIcon icon={faRemove} /> Delete
          </span>
        </div>
      </div>
      {showInvite && (
        <InviteEvent
          onClose={() => setShowInvite(false)}
          onInvited={handleInviteVisibility}
          eventId={event.id}
        />
      )}
      {showParticipants && (
        <Participants
          onClose={() => setShowParticipants(false)}
          eventId={event.id}
        />
      )}
    </div>
  );
}
