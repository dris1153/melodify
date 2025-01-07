import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Typography } from "@mui/material";
import Artist from "../Components/common/Artist";

const Artists = ({ artists }) => {
    return (
        <MainLayout>
            <Head title="Songs" />
            <div className="w-full h-full">
                <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center mt-12 cursor-pointer ">
                        <Typography variant="h5">Explore Artist</Typography>
                    </div>
                    <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-6">
                        {artists.map((artist) => (
                            <Artist key={artist.id} {...artist} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Artists;
