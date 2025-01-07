import { Link, usePage } from "@inertiajs/react";
import React from "react";
import Dropdown from "../admin/primitives/Dropdown";
import { cn } from "@/helpers/base";
import { Logout, MusicNote, Person } from "@mui/icons-material";

const Profile = () => {
    const user = usePage().props.auth.user;

    return (
        // <Link
        //     className="flex items-center gap-[10px] cursor-pointer"
        //     href={route("profile.edit")}
        // >

        // </Link>
        <Dropdown>
            <Dropdown.Trigger>
                <button className="flex items-center cursor-pointer">
                    <img
                        src={user?.avatar}
                        className="w-[42px] h-[42px] rounded-full"
                    />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content
                contentClasses="bg-[#333] p-[12px]"
                widthClasses="w-[300px]"
            >
                <div className="flex items-center gap-[12px]">
                    <img
                        src={user?.avatar}
                        className="w-[64px] h-[64px] rounded-full"
                    />
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-md font-[500]">{user?.name}</p>
                        <BadgeRole role={user?.role} />
                    </div>
                </div>
                <hr className="mt-[24px] mb-[12px] border-[#fff2]" />
                <Link
                    className="flex items-center py-[12px] gap-[8px] hover:bg-[#222] -mx-[6px] px-[6px] rounded-[4px] w-[calc(100%+12px)]"
                    href={route("profile.edit")}
                >
                    <Person
                        sx={{
                            fontSize: "20px",
                            color: "#fff9",
                        }}
                    />
                    <span className="text-[14px] text-[#fff9]">Profile</span>
                </Link>
                {user?.role === "artist" && (
                    <Link
                        className="flex items-center py-[12px] gap-[8px] hover:bg-[#222] -mx-[6px] px-[6px] rounded-[4px] w-[calc(100%+12px)]"
                        href={route("artist.detail", { id: user?.id })}
                    >
                        <MusicNote
                            sx={{
                                fontSize: "20px",
                                color: "#fff9",
                            }}
                        />
                        <span className="text-[14px] text-[#fff9]">Musics</span>
                    </Link>
                )}
                <hr className="mt-[12px] mb-[12px] border-[#fff2]" />
                <Link
                    className="flex items-center py-[12px] gap-[8px] hover:bg-[#222] -mx-[6px] px-[6px] rounded-[4px] w-[calc(100%+12px)]"
                    href={route("logout")}
                    method="post"
                >
                    <Logout
                        sx={{
                            fontSize: "20px",
                            color: "#fff9",
                        }}
                    />
                    <span className="text-[14px] text-[#fff9]">Logout</span>
                </Link>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default Profile;

const BadgeRole = ({ role }) => {
    return (
        <span
            className={cn(
                `px-[6px] py-[2px] text-xs rounded-[4px] w-max uppercase font-bold bg-slate-500`,
                {
                    "bg-green-700 text-white": role === "admin",
                    "bg-amber-600 text-white": role === "artist",
                }
            )}
        >
            {role}
        </span>
    );
};
