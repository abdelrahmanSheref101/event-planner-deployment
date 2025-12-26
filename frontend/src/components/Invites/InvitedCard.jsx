import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faCalendarDays,
        faCheck,
        faCircleInfo,
        faClockFour,
        faLocationDot,
        faQuestion,
        faX,
} from "@fortawesome/free-solid-svg-icons";
import API from "../../Api/Api";
import Loading from "./../Loading/Loading";

export default function InvitedCard({ event }) {
        const [loading, setLoading] = useState(false);

        const handleResponse = async (res) => {
                setLoading(true);
                try {
                        console.log(res);

                        await API.post(`/events/${event.id}/respond`, { status: res });
                } catch (err) {
                        console.log(err.response?.data);
                        console.log(err);
                } finally {
                        setLoading(false);
                }
        };
        return (
                <>
                        {loading ? (
                                <Loading />
                        ) : (
                                <div
                                        key={event.id}
                                        className="bg-gray-100 shadow-lg hover:shadow-xl card p-4 m-4 rounded-2xl duration-200 text-gray-700"
                                >
                                        <div className="p-4 ">
                                                <div className="header border-b-2 flex justify-between pb-3 flex-col md:flex-row text-center md:text-left">
                                                        <h2 className="font-semibold text-xl">{event.title}</h2>
                                                        <span>
                                                                Organized by{" "}
                                                                <span className="font-semibold">{event.organizer_name}</span>
                                                        </span>
                                                </div>
                                                <div className="flex flex-col lg:flex-row">
                                                        <div className="mr-4 mt-4">
                                                                <FontAwesomeIcon className="mr-1" icon={faCalendarDays} />
                                                                {event.date}
                                                        </div>
                                                        <div className="mr-4 mt-4">
                                                                <FontAwesomeIcon className="mr-1" icon={faClockFour} />
                                                                {event.time}
                                                        </div>
                                                        <div className="mr-4 mt-4">
                                                                <FontAwesomeIcon className="mr-1" icon={faLocationDot} />
                                                                {event.location}
                                                        </div>
                                                </div>
                                                {event.description && (
                                                        <p className="mt-4 mb-4">
                                                                <FontAwesomeIcon className="mr-2" icon={faCircleInfo} />
                                                                {event.description}
                                                        </p>
                                                )}
                                                <div className="flex justify-around gap-5 flex-col lg:flex-row">
                                                        <span
                                                                onClick={() => handleResponse("going")}
                                                                className="cursor-pointer duration-200 bg-green-500 hover:bg-green-600 text-center text-white rounded-lg w-full pt-2 pb-2"
                                                        >
                                                                <FontAwesomeIcon className="mr-1" icon={faCheck} />
                                                                Going
                                                        </span>
                                                        <span
                                                                onClick={() => handleResponse("maybe")}
                                                                className="cursor-pointer duration-200 bg-yellow-500 hover:bg-yellow-600 text-center text-white rounded-lg w-full pt-2 pb-2"
                                                        >
                                                                <FontAwesomeIcon className="mr-1" icon={faQuestion} />
                                                                Maybe
                                                        </span>
                                                        <span
                                                                onClick={() => handleResponse("not going")}
                                                                className="cursor-pointer duration-200 bg-red-500 hover:bg-red-600 text-center text-white rounded-lg w-full pt-2 pb-2"
                                                        >
                                                                <FontAwesomeIcon className="mr-1" icon={faX} />
                                                                Not Going
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        )}
                </>
        );
}
