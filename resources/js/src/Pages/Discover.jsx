import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Typography } from "@mui/material";
import { Head } from "@inertiajs/react";

const Discover = () => {
    return (
        <MainLayout>
            <Head title="Discover" />
            <div className="w-full h-full">
                <Typography variant="h5" sx={{ mt: 6 }}>
                    Playlist
                </Typography>
                <Typography variant="h5" sx={{ mt: 6 }}>
                    Musics
                </Typography>
            </div>
        </MainLayout>
    );
};

export default Discover;
