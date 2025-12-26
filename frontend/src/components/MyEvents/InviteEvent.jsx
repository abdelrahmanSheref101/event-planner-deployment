import { useState } from "react";
import API from "../../Api/Api";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function InviteEvent({ onClose, onInvited, eventId }) {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const [email, setEmail] = useState("");
        const handleChange = (e) => {
                setEmail(e.target.value);
        };
        console.log(eventId);
        console.log(email);

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                try {
                        await API.post(`/events/${eventId}/invite`, { email });
                        if (onInvited) onInvited();
                } catch (err) {
                        console.log(err);
                        setError(
                                err.response?.data?.error || "Failed to invite user. Please try again."
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
                                                Invitation Request
                                        </h2>
                                        <button
                                                onClick={onClose}
                                                className="text-gray-500 hover:text-gray-800"
                                        >
                                                <FontAwesomeIcon icon={faRemove} />
                                        </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-3">
                                        <label className="block text-sm font-medium mb-3">
                                                Invite user by Email
                                        </label>
                                        <input
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                placeholder="user@example.com"
                                                required
                                        />
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
                                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                                </form>
                        </div>
                </div>
        );
}
