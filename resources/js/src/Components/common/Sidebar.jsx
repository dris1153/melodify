import { cn } from "@/helpers/base";
import { Link } from "@inertiajs/react";
import React from "react";

const ListItems = [
    // {
    //     title: "Library",
    //     icon: "home",
    //     route: "library",
    // },
    {
        title: "Discover",
        icon: "discover",
        route: "discover",
    },
    // {
    //     title: "Albums",
    //     icon: "album",
    //     route: "discover",
    // },
];

const Sidebar = () => {
    return (
        <div className="w-full h-full pt-[45px]">
            <h1 className="text-[24px] font-[700] ml-[32px]">Melodify</h1>
            <div className="flex flex-col mt-[28px]">
                {ListItems?.map((item, index) => (
                    <Link
                        key={index}
                        href={route(item?.route)}
                        className={cn(
                            "flex items-center py-[8px] pl-[40px] hover:bg-[#383838] group cursor-pointer h-[64px]",
                            {
                                "bg-[#383838] pointer-events-none":
                                    route().current(item?.route),
                            }
                        )}
                    >
                        <img
                            src={`/images/sidebar-icons/${item?.icon}.svg`}
                            className={cn("grayscale group-hover:grayscale-0", {
                                "grayscale-0": route().current(item?.route),
                            })}
                        />
                        <span
                            className={cn(
                                "text-[16px] ml-[16px] group-hover:text-[#FFC100]",
                                {
                                    "text-[#FFC100]": route().current(
                                        item?.route
                                    ),
                                }
                            )}
                        >
                            {item.title}
                        </span>
                        <span
                            className={cn(
                                "w-[6px] h-0 bg-[#FFC100] block ml-auto rounded-bl-full rounded-tl-full group-hover:h-[48px] transition-all duration-150",
                                {
                                    "h-[48px]": route().current(item?.route),
                                }
                            )}
                        ></span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
