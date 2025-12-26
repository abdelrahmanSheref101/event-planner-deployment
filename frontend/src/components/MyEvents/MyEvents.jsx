import { useEffect, useState } from "react";
import API from "../../Api/Api";
import Loading from "../Loading/Loading";
import CreateEvent from "./CreateEvent";
import EventCard from "./MyEventCard";

export default function MyEvents() {
        const [showCreateEvent, setShowCreateEvent] = useState(false);
        const [events, setEvents] = useState([]);
        const [filterEvents, setFilterEvents] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState("");
        const searchMyEvents = events.filter((event) => {
                const q = filterEvents.toLowerCase().trim();
                if (!q) return true;
                const fields = [
                        event.title,
                        event.description,
                        event.location,
                        event.date,
                        event.time,
                ];
                return fields.some((field) => field?.toString().toLowerCase().includes(q));
        });
        const hasSearch = filterEvents.trim().length > 0;
        const eventsToDisplay = hasSearch ? searchMyEvents : events;
        const fetchMyEvents = async () => {
                setIsLoading(true);
                setError("");
                try {
                        const { data } = await API.get("/events/my_events");
                        setEvents(data);
                } catch (err) {
                        console.log(err);
                        setError(
                                err.response?.data?.error ||
                                "Failed to load your events. Please try again."
                        );
                } finally {
                        setIsLoading(false);
                }
        };
        useEffect(() => {
                fetchMyEvents();
        }, []);
        const handleDelete = async (id) => {
                if (!window.confirm("Are you sure you want to delete this event?")) return;
                try {
                        await API.delete(`/events/${id}`);
                        setEvents((prev) => prev.filter((e) => e.id !== id));
                } catch (err) {
                        console.log(err);
                        setError(
                                err.response?.data?.error || "Failed to delete event, please try again."
                        );
                }
        };
        const handleEventCreated = () => {
                setShowCreateEvent(false);
                fetchMyEvents();
        };
        return (
                <>
                        <div className="max-w-4xl mx-auto p-4">
                                <div className="flex justify-between items-center">
                                        <h1 className="font-bold text-3xl p-4 text-gray-700">My events</h1>
                                        <span
                                                onClick={() => setShowCreateEvent(true)}
                                                className="h-fit py-3 px-4 rounded-2xl bg-gray-700 hover:bg-gray-900 text-white cursor-pointer duration-200"
                                        >
                                                Create Event
                                        </span>
                                </div>
                                <div className="p-2">
                                        <input
                                                value={filterEvents}
                                                onChange={(e) => setFilterEvents(e.target.value)}
                                                type="text"
                                                placeholder="Search by title, description, date, time, location..."
                                                className="rounded-lg border-2 border-gray-200 hover:border-gray-600 duration-200 w-full p-2 pl-4"
                                        />
                                </div>
                                {error && <p className="text-red-500 text-sm px-4 my-2">{error}</p>}
                                {isLoading ? (
                                        <Loading />
                                ) : (
                                        <>
                                                {eventsToDisplay.length > 0 ? (
                                                        eventsToDisplay.map((event) => (
                                                                <EventCard
                                                                        key={event.id}
                                                                        event={event}
                                                                        onDelete={handleDelete}
                                                                />
                                                        ))
                                                ) : hasSearch ? (
                                                        <p className="text-gray-500 text-sm px-4">
                                                                No events match your search.
                                                        </p>
                                                ) : (
                                                        <p className="text-gray-500 text-sm px-4">
                                                                You did not create any events yet.
                                                        </p>
                                                )}
                                        </>
                                )}
                        </div>
                        {showCreateEvent && (
                                <CreateEvent
                                        onClose={() => setShowCreateEvent(false)}
                                        onCreated={handleEventCreated}
                                />
                        )}
                </>
        );
}
