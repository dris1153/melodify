import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Typography } from "@mui/material";
import Song from "../Components/common/Song";
import Artist from "../Components/common/Artist";
import { Face4Rounded } from "@mui/icons-material";

const Search = ({ artists, songs }) => {
    return (
        <MainLayout>
            <Head title="Search" />
            <div className="w-full h-full">
                <div className="flex flex-col gap-[12px]">
                    <Typography variant="h5" sx={{ mt: 6 }}>
                        Artists
                    </Typography>
                    <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-5">
                        {artists?.length > 0 ? (
                            artists.map((artist) => (
                                <Artist key={artist.id} {...artist} />
                            ))
                        ) : (
                            <div className="flex items-center gap-[16px] mt-2">
                                <Face4Rounded />
                                <Typography variant="h6">
                                    No artists found
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <Typography variant="h5" sx={{ mt: 6 }}>
                        Songs
                    </Typography>
                    <div className="w-full grid grid-auto-rows gap-6 md:grid-cols-4 lg:grid-cols-5">
                        {songs?.length > 0 ? (
                            songs.map((song) => (
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
        </MainLayout>
    );
};

export default Search;
