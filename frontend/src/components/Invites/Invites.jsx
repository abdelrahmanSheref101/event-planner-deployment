import { useEffect, useState } from "react";

import API from "../../Api/Api";
import Loading from "./../Loading/Loading";
import InvitedCard from "./InvitedCard";
export default function invites() {
        const [invitedEvents, setInvitedEvents] = useState([]);
        const [loading, setLoading] = useState(false);
        const fetchMyEvents = async () => {
                setLoading(true);
                try {
                        const { data } = await API.get("/events/my_invited_events");
                        setInvitedEvents(data);
                } catch (error) {
                } finally {
                        setLoading(false);
                }
        };
        useEffect(() => {
                fetchMyEvents();
        }, []);

        return (
                <>
                        {loading ? (
                                <Loading />
                        ) : (
                                <div className="min-w-6/12 md:max-w-7/12 p-5 mx-auto rounded-lg">
                                        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-500 flex-col md:flex-row">
                                                <h2 className="text-xl">Events I'm invited to</h2>
                                                <span className="bg-gray-700 hover:bg-gray-800 duration-200 text-white px-4 py-2 rounded-lg mt-4 md:mt-0">
                                                        {invitedEvents.length} Invitations
                                                </span>
                                        </div>
                                        {invitedEvents.length > 0 ? (
                                                invitedEvents.map((e) => {
                                                        return <InvitedCard key={e.id} event={e} />;
                                                })
                                        ) : (
                                                <div className="text-center">
                                                        <p className="text-red-600 mt-4">
                                                                You are not invited to any event.
                                                        </p>
                                                </div>
                                        )}
                                </div>
                        )}
                </>
        );
}
