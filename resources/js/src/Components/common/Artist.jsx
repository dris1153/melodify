import { cn } from "@/helpers/base";
import { router } from "@inertiajs/react";
import { ViewAgenda } from "@mui/icons-material";
import React from "react";

const Artist = ({ avatar, name, id }) => {
    return (
        <div className="w-full h-full">
            <div
                className="relative rounded-full overflow-hidden w-full aspect-square group select-none cursor-pointer"
                onClick={() => {
                    router.visit(route("artist.detail", { id }));
                }}
            >
                <img
                    src={avatar}
                    alt={name}
                    className="absolute left-1/2 -translate-x-1/2 origin-center object-cover object-center w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out"
                />
                <div
                    className={cn(
                        "absolute inset-0 bg-[#0008] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out flex items-center justify-center"
                    )}
                >
                    <div className="w-[48px] h-[48px] border-[2px] border-solid border-white rounded-full flex items-center justify-center">
                        <ViewAgenda />
                    </div>
                </div>
            </div>
            <h3 className="mt-6 text-lg text-center font-semibold line-clamp-1">
                {name}
            </h3>
        </div>
    );
};

export default Artist;
