import { useState } from "react";
import API from "../../Api/Api";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateEvent({ onClose, onCreated }) {
        const [form, setForm] = useState({
                title: "",
                date: "",
                time: "",
                location: "",
                description: "",
        });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const handleChange = (e) => {
                const { name, value } = e.target;
                setForm((prev) => ({ ...prev, [name]: value }));
        };
        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                try {
                        await API.post("/events/create_event", form);
                        if (onCreated) onCreated();
                } catch (err) {
                        console.log(err);
                        setError(
                                err.response?.data?.error || "Failed to create event. Please try again."
                        );
                } finally {
                        setLoading(false);
                }
        };
        return (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl mb-2 font-semibold text-gray-800">
                                                Create New Event
                                        </h2>
                                        <button
                                                onClick={onClose}
                                                className="text-gray-500 hover:text-gray-800"
                                        >
                                                <FontAwesomeIcon icon={faRemove} />
                                        </button>
                                </div>
                                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                                <form onSubmit={handleSubmit} className="space-y-3">
                                        <div>
                                                <label className="block text-sm font-medium mb-1">Title</label>
                                                <input
                                                        name="title"
                                                        value={form.title}
                                                        onChange={handleChange}
                                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                                        required
                                                />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                        <label className="block text-sm font-medium mb-1">Date</label>
                                                        <input
                                                                type="date"
                                                                name="date"
                                                                value={form.date}
                                                                onChange={handleChange}
                                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <label className="block text-sm font-medium mb-1">Time</label>
                                                        <input
                                                                type="time"
                                                                name="time"
                                                                value={form.time}
                                                                onChange={handleChange}
                                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                                required
                                                        />
                                                </div>
                                        </div>
                                        <div>
                                                <label className="block text-sm font-medium mb-1">Location</label>
                                                <input
                                                        name="location"
                                                        value={form.location}
                                                        onChange={handleChange}
                                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                                        required
                                                />
                                        </div>
                                        <div>
                                                <label className="block text-sm font-medium mb-1">
                                                        Description
                                                </label>
                                                <textarea
                                                        name="description"
                                                        value={form.description}
                                                        onChange={handleChange}
                                                        rows="3"
                                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                                />
                                        </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                                <button
                                                        type="button"
                                                        onClick={onClose}
                                                        className="px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        disabled={loading}
                                                >
                                                        Cancel
                                                </button>
                                                <button
                                                        type="submit"
                                                        className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-60"
                                                        disabled={loading}
                                                >
                                                        {loading ? "Creating..." : "Create"}
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}
