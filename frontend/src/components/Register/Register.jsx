import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
export default function register() {
        const navigate = useNavigate();
        const validationSchema = Yup.object({
                name: Yup.string()
                        .min(3, "Name must be at least 3 characters")
                        .required("Name is required"),
                email: Yup.string()
                        .email("Invalid email address")
                        .required("Email is required"),
                password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                confirmPassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Confirm your password"),
        });
        const formik = useFormik({
                initialValues: {
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                },
                validationSchema,
                onSubmit: async (values, { resetForm }) => {
                        try {
                                const res = await axios.post(
                                        "/api/auth/register",
                                        {
                                                Name: values.name,
                                                email: values.email,
                                                password: values.password,
                                        }
                                );
                                toast.success(res.data.message || "Registered successfully!");
                                navigate("/login");
                        } catch (err) {
                                toast.error(err.response?.data?.error || "Registration failed");
                        }
                },
        });
        return (
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                        Create an account
                                </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form
                                        onSubmit={formik.handleSubmit}
                                        action="#"
                                        method="POST"
                                        className="space-y-6"
                                >
                                        <div>
                                                <label
                                                        htmlFor="name"
                                                        className="block text-sm/6 font-medium text-gray-900"
                                                >
                                                        Name
                                                </label>
                                                <div className="mt-2">
                                                        <input
                                                                id="name"
                                                                name="name"
                                                                type="text"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.name}
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                        />
                                                        {formik.touched.name && formik.errors.name ? (
                                                                <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                                        ) : null}
                                                </div>
                                        </div>
                                        <div>
                                                <label
                                                        htmlFor="email"
                                                        className="block text-sm/6 font-medium text-gray-900"
                                                >
                                                        Email address
                                                </label>
                                                <div className="mt-2">
                                                        <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.email}
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                        />
                                                        {formik.touched.email && formik.errors.email ? (
                                                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                                        ) : null}
                                                </div>
                                        </div>
                                        <div>
                                                <div className="flex items-center justify-between">
                                                        <label
                                                                htmlFor="password"
                                                                className="block text-sm/6 font-medium text-gray-900"
                                                        >
                                                                Password
                                                        </label>
                                                </div>
                                                <div className="mt-2">
                                                        <input
                                                                id="password"
                                                                name="password"
                                                                type="password"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.password}
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                        />
                                                        {formik.touched.password && formik.errors.password ? (
                                                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                                                        ) : null}
                                                </div>
                                        </div>
                                        <div>
                                                <div className="flex items-center justify-between">
                                                        <label
                                                                htmlFor="confirmPassword"
                                                                className="block text-sm/6 font-medium text-gray-900"
                                                        >
                                                                Confirm Password
                                                        </label>
                                                </div>
                                                <div className="mt-2">
                                                        <input
                                                                id="confirmPassword"
                                                                name="confirmPassword"
                                                                type="password"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.confirmPassword}
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                        />
                                                        {formik.touched.confirmPassword &&
                                                                formik.errors.confirmPassword ? (
                                                                <p className="text-red-500 text-sm">
                                                                        {formik.errors.confirmPassword}
                                                                </p>
                                                        ) : null}
                                                </div>
                                        </div>
                                        <div>
                                                <button
                                                        type="submit"
                                                        className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                        Sign up
                                                </button>
                                        </div>
                                        <div className="text-gray-700 p-1 text-center">
                                                <p className="">
                                                        Already have an account?{" "}
                                                        <NavLink
                                                                className="underline hover:text-black duration-200"
                                                                to={"../login"}
                                                        >
                                                                Sign in
                                                        </NavLink>
                                                </p>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}
