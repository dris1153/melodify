import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Typography } from "@mui/material";
import { Head } from "@inertiajs/react";
import Song from "../Components/common/Song";

const Discover = ({ newestSongs }) => {
    return (
        <MainLayout>
            <Head title="Discover" />
            <div className="w-full h-full">
                <Typography variant="h5" sx={{ mt: 6 }}>
                    Playlist
                </Typography>
                <div className="flex flex-col gap-[12px]">
                    <Typography variant="h5" sx={{ mt: 6 }}>
                        New Drops - Feel the Vibe
                    </Typography>
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
