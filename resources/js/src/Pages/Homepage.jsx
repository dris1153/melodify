import MainLayout from "@/src/Layouts/MainLayout";
import { Typography } from "@mui/material";
import React from "react";

const Homepage = () => {
    return (
        <MainLayout>
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

export default Homepage;
