import { Link, usePage } from "@inertiajs/react";
import React from "react";

const Profile = () => {
    const user = usePage().props.auth.user;

    return (
        <Link
            className="flex items-center gap-[10px] cursor-pointer"
            href={route("profile.edit")}
        >
            <img
                src={user?.avatar}
                className="w-[42px] h-[42px] rounded-full"
            />
        </Link>
    );
};

export default Profile;
