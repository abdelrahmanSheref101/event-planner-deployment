import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import API from "../../Api/Api";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faAddressCard,
        faEnvelope,
        faUser,
} from "@fortawesome/free-regular-svg-icons";
export default function profile() {
        const [profile, setProfile] = useState({
                email: "",
                id: "",
                name: "",
        });
        const [loading, setLoading] = useState(false);
        const fetchMyProfile = async () => {
                setLoading(true);
                try {
                        const res = await API.get("/auth/profile");
                        console.log(res.data);
                        setProfile(res.data);
                } catch (err) {
                        console.log(err);
                } finally {
                        setLoading(false);
                }
        };
        useEffect(() => {
                fetchMyProfile();
        }, []);
        return (
                <div className="w-full">
                        {loading ? (
                                <Loading />
                        ) : (
                                <div className="min-w-6/12 mx-auto xl:max-w-8/12">
                                        <div className="w-full text-center border-b-4 border-purple-700 pb-4">
                                                <h2 className="w-fit mx-auto text-4xl">{profile.name}</h2>
                                        </div>
                                        <div className="card bg-gray-200 pt-8 pb-8 pl-4 rounded-lg mt-4">
                                                <h2 className="mt-4 mb-4">Personal Information</h2>
                                                <div className="flex items-center mb-4">
                                                        <div className="icon p-2 bg-white m-2 rounded-xl">
                                                                <FontAwesomeIcon icon={faAddressCard} />
                                                        </div>
                                                        <div className="info">
                                                                <p className="text-gray-600">User ID</p>
                                                                <p className="text-gray-800">{profile.id}</p>
                                                        </div>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                        <div className="icon p-2 bg-white m-2 rounded-xl">
                                                                <FontAwesomeIcon icon={faUser} />
                                                        </div>
                                                        <div className="info">
                                                                <p className="text-gray-600">Full Name</p>
                                                                <p className="text-gray-800">{profile.name}</p>
                                                        </div>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                        <div className="icon p-2 bg-white m-2 rounded-xl">
                                                                <FontAwesomeIcon icon={faEnvelope} />
                                                        </div>
                                                        <div className="info">
                                                                <p className="text-gray-600">Email Address</p>
                                                                <p className="text-gray-800">{profile.email}</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        )}
                </div>
        );
}
