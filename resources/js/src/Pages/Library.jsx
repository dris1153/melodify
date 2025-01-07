import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Typography } from "@mui/material";
import Song from "../Components/common/Song";
import { Face4Rounded } from "@mui/icons-material";

const Library = ({ favoriteSongs }) => {
    return (
        <MainLayout>
            <Head title="Library" />
            <div className="w-full h-full">
                <div className="flex flex-col gap-[12px]">
                    <Typography variant="h5" sx={{ mt: 6 }}>
                        Your favourite songs
                    </Typography>
                    <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-5">
                        {favoriteSongs?.length > 0 ? (
                            favoriteSongs.map((song) => (
                                <Song key={song.id} {...song} />
                            ))
                        ) : (
                            <div className="flex items-center gap-[16px] mt-2 w-max">
                                <Face4Rounded />
                                <Typography variant="h6">
                                    You haven't added any songs to your library
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Library;
