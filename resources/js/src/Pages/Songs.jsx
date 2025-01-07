import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Typography } from "@mui/material";
import Song from "../Components/common/Song";

const Songs = ({ songs }) => {
    return (
        <MainLayout>
            <Head title="Songs" />
            <div className="w-full h-full">
                <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center mt-12 cursor-pointer ">
                        <Typography variant="h5">Explore Songs</Typography>
                    </div>
                    <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-5">
                        {songs.map((song) => (
                            <Song key={song.id} {...song} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Songs;
