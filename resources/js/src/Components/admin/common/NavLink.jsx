import { Link } from "@inertiajs/react";
import { useState } from "react";
import Dropdown from "../primitives/Dropdown";

export default function NavLink({
    active = false,
    className = "",
    children,
    dropdown,
    ...props
}) {
    if (dropdown) {
        return (
            <div className="relative inline-flex items-center border-transparent border-b-2 pt-1 transition duration-150 ease-in-out focus:outline-none hover:border-gray-300 focus:border-gray-300 dark:hover:border-gray-700 dark:focus:border-gray-700">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-white py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                {children}
                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        {dropdown.map((item, index) => {
                            return (
                                <Dropdown.Link key={index} {...item}>
                                    {item?.label}
                                </Dropdown.Link>
                            );
                        })}
                        {/* <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link> */}
                    </Dropdown.Content>
                </Dropdown>
            </div>
        );
    } else {
        return (
            <Link
                {...props}
                className={
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                    (active
                        ? "border-indigo-400 text-gray-900 focus:border-indigo-700 dark:border-indigo-600 dark:text-gray-100"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300") +
                    className
                }
            >
                {children}
            </Link>
        );
    }
}
