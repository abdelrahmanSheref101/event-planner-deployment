import { useEffect, useState } from "react";
import API from "../../Api/Api";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Participants({ onClose, eventId }) {
        const [participants, setParticipants] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const fetchParticipants = async () => {
                if (!eventId) return;
                setLoading(true);
                setError("");
                try {
                        console.log(eventId);
                        const res = await API.get(`/events/${eventId}/participants`);
                        setParticipants(res.data);
                } catch (err) {
                        console.error(err);
                        setError(
                                err.response?.data?.error ||
                                "Failed to load participants. Please try again."
                        );
                } finally {
                        setLoading(false);
                }
        };
        useEffect(() => {
                fetchParticipants();
        }, [eventId]);
        return (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800">
                                                Event Participants
                                        </h2>
                                        <button
                                                onClick={onClose}
                                                className="text-gray-500 hover:text-gray-800"
                                        >
                                                <FontAwesomeIcon icon={faRemove} />
                                        </button>
                                </div>
                                {loading && <p className="text-sm text-gray-600">Loading...</p>}
                                {!loading && error && (
                                        <p className="text-sm text-red-500 mb-2">{error}</p>
                                )}
                                {!loading && !error && (
                                        <>
                                                {participants.length === 0 ? (
                                                        <p className="text-sm text-gray-600">
                                                                No participants for this event yet.
                                                        </p>
                                                ) : (
                                                        <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                                                                {participants.map((p) => (
                                                                        <li
                                                                                key={p.user_id}
                                                                                className="py-3 flex items-center justify-between"
                                                                        >
                                                                                <div>
                                                                                        <p className="font-medium text-gray-800">
                                                                                                {p.name}{" "}
                                                                                                <span className=" text-gray-500">
                                                                                                        (ID: {p.user_id})
                                                                                                </span>
                                                                                        </p>
                                                                                        <p className=" text-gray-500 mt-1">
                                                                                                Role:{" "}
                                                                                                <span className="font-semibold uppercase">
                                                                                                        {p.role}
                                                                                                </span>{" "}
                                                                                                · Status:{" "}
                                                                                                <span className="font-semibold">
                                                                                                        {p.attendance_status}
                                                                                                </span>
                                                                                        </p>
                                                                                </div>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                )}
                                        </>
                                )}
                                <div className="flex justify-end pt-4">
                                        <button
                                                onClick={onClose}
                                                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                                Close
                                        </button>
                                </div>
                        </div>
                </div>
        );
}
