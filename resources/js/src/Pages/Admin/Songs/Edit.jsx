import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import FormEditSongInfo from "./Partials/FormEditSongInfo";
import FormDeleteSong from "./Partials/FormDeleteSong";

const SongEdit = ({ genres, artists, song }) => {
    const user = usePage().props.auth.user;
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {song ? `Edit ${song.title}` : "Create Song"}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <FormEditSongInfo
                            className="max-w-xl"
                            genres={genres}
                            artists={artists}
                            song={song}
                            user={user}
                        />
                    </div>
                    {song && (
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <FormDeleteSong song={song} user={user} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SongEdit;
