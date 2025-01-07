import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Check, Face4Rounded, PersonAdd, PersonOff } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Song from "../Components/common/Song";
import { cn } from "@/helpers/base";

const ArtistDetail = ({ artist, followed }) => {
    const user = usePage().props.auth.user;
    return (
        <MainLayout positionHeader="absolute">
            <Head title={artist?.name} />
            <div className="w-full flex flex-col">
                <div className="w-[calc(100%+80px)] p-[40px] -mx-[40px] rounded-[12px] relative overflow-hidden">
                    <img
                        src={artist?.avatar}
                        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center blur-[75px] brightness-[0.75]"
                    />
                    <div className="relative w-full h-full mt-[75px] flex items-center gap-[40px]">
                        <img
                            src={artist?.avatar}
                            className="w-[175px] h-[175px] rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-[12px]">
                            <h6 className="text-[45px] font-[600]">
                                {artist?.name}
                            </h6>
                            <div className="flex items-end gap-[12px]">
                                <p className="text-sm">
                                    {artist?.follower} người quan tâm
                                </p>
                                {user && user?.id != artist?.id && (
                                    <Link
                                        className={cn(
                                            "rounded-[24px] border border-solid border-[#fff6] px-[16px] py-[2px] flex items-center gap-[6px] hover:opacity-75"
                                        )}
                                        href={route("artist.follow", {
                                            id: artist?.id,
                                        })}
                                        method="post"
                                    >
                                        {followed ? (
                                            <Check
                                                className="text-[#fff]"
                                                sx={{
                                                    fontSize: "18px",
                                                }}
                                            />
                                        ) : (
                                            <PersonAdd
                                                className="text-[#fff]"
                                                sx={{
                                                    fontSize: "18px",
                                                }}
                                            />
                                        )}
                                        <span className="text-sm">
                                            {followed ? "Followed" : "Follow"}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="flex flex-col gap-[12px]">
                        <Typography variant="h5" sx={{ mt: 6 }}>
                            Songs by {artist?.name}
                        </Typography>
                        <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-5">
                            {artist?.songs?.length > 0 ? (
                                artist?.songs?.map((song) => (
                                    <Song key={song.id} {...song} />
                                ))
                            ) : (
                                <div className="flex items-center gap-[16px] mt-2">
                                    <Face4Rounded />
                                    <Typography variant="h6">
                                        No songs found
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ArtistDetail;
