import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Typography } from "@mui/material";
import { Head, router } from "@inertiajs/react";
import Song from "../Components/common/Song";
import { ArrowForward } from "@mui/icons-material";

const Discover = ({ newestSongs }) => {
    return (
        <MainLayout>
            <Head title="Discover" />
            <div className="w-full h-full">
                <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center mt-12 cursor-pointer ">
                        <Typography variant="h5">
                            New Drops - Feel the Vibe
                        </Typography>
                        <div
                            className="flex items-center gap-2 ml-auto text-gray-500 hover:text-white group select-none"
                            onClick={() => router.visit(route("songs.index"))}
                        >
                            <span>See All</span>
                            <ArrowForward
                                sx={{
                                    fontSize: "1rem",
                                }}
                                className="transform group-hover:translate-x-1 transition-all duration-150"
                            />
                        </div>
                    </div>
                    <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-5">
                        {newestSongs.map((song) => (
                            <Song key={song.id} {...song} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Discover;
